import { useEffect, useMemo, useRef, useState } from "react";
import { HealthResponse, Service, ServiceDef, Statuses, UseServicePollingOptions, UseServicePollingResult } from "../types.ts";

const makeInitialServices = (
	defs: readonly ServiceDef[],
	initialStatus: Statuses,
	defaultUptime7d: number
): Service[] => {
	return defs.map((d) => ({
		id: d.id,
		name: d.name,
		status: initialStatus,
		latencyMs: 0,
		uptime7d: d.uptime7d ?? defaultUptime7d
	}));
};

const mergeServices = (prev: Service[], defs: readonly ServiceDef[], nextById: Map<string, Service>): Service[] => {
	const byId = new Map(prev.map((s) => [s.id, s] as const));

	for (const def of defs) {
		const existing = byId.get(def.id);
		const incoming = nextById.get(def.id);

		if (!existing && incoming) {
			byId.set(def.id, incoming);
			continue;
		}
		if (existing && incoming) byId.set(def.id, { ...existing, ...incoming });
	}

	const allowed = new Set(defs.map((d) => d.id));
	return Array.from(byId.values()).filter((s) => allowed.has(s.id));
};

const useServicePolling = (
	serviceDefs: readonly ServiceDef[],
	opts: UseServicePollingOptions
): UseServicePollingResult => {
	const {
		intervalMs = 15000,
		initialStatus = "maintenance",
		defaultUptime7d = 99.99,
		fetcher = fetch,
		statusFromHealth,
		latencyFromHealth
	} = opts;

	const [services, setServices] = useState<Service[]>(() =>
		makeInitialServices(serviceDefs, initialStatus, defaultUptime7d)
	);
	const [lastUpdatedAt, setLastUpdatedAt] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<unknown | null>(null);

	const mountedRef = useRef(false);
	const abortRef = useRef<AbortController | null>(null);

	const defsKey = useMemo(
		() => serviceDefs.map((d) => `${d.id}:${d.healthUrl}:${d.name}:${d.uptime7d ?? ""}`).join("|"),
		[serviceDefs]
	);

	useEffect(() => {
		setServices(makeInitialServices(serviceDefs, initialStatus, defaultUptime7d));
	}, [defsKey]);

	const refresh = async () => {
		abortRef.current?.abort();
		const ctrl = new AbortController();
		abortRef.current = ctrl;

		setLoading(true);
		setError(null);

		try {
			const fetchOne = async (def: ServiceDef): Promise<Service> => {
				const t0 = performance.now();

				const res = await fetcher(def.healthUrl, {
					headers: { accept: "application/json" },
					signal: ctrl.signal
				});

				const measuredMs = performance.now() - t0;

				let body: HealthResponse;
				try {
					body = (await res.json()) as HealthResponse;
				} catch {
					body = {};
				}

				return {
					id: def.id,
					name: def.name,
					status: statusFromHealth(body, res.ok),
					latencyMs: latencyFromHealth(body, measuredMs),
					uptime7d: def.uptime7d ?? defaultUptime7d
				};
			};

			const results = await Promise.allSettled(serviceDefs.map((d) => fetchOne(d)));

			if (!mountedRef.current || ctrl.signal.aborted) return;

			const next = new Map<string, Service>();
			for (const r of results) if (r.status === "fulfilled") next.set(r.value.id, r.value);

			setServices((prev) => mergeServices(prev, serviceDefs, next));
			setLastUpdatedAt(new Date().toISOString());
		} catch (err: unknown) {
			if (!mountedRef.current || ctrl.signal.aborted) return;
			setError(err);
			console.error("poll failed", err);
		} finally {
			if (mountedRef.current) setLoading(false);
		}
	};

	useEffect(() => {
		mountedRef.current = true;
		refresh().catch((err: unknown) => {
			console.error("poll failed", err);
		});

		const id = window.setInterval(() => {
			refresh().catch((err: unknown) => {
				console.error("poll failed", err);
			});
		}, intervalMs);

		return () => {
			mountedRef.current = false;
			abortRef.current?.abort();
			window.clearInterval(id);
		};
	}, [intervalMs, defsKey]);

	return { services, lastUpdatedAt, loading, error, refresh };
};

export default useServicePolling;
