import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useServicePolling } from "@/hooks";
import type { ServiceDef, Service, Statuses, HealthResponse } from "@/types.ts";

type Star = { x: number; y: number; r: number; a: number };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number; max: number; w: number };

type Incident = {
	id: string;
	title: string;
	status: "investigating" | "identified" | "monitoring" | "resolved";
	startedAt: string;
	updatedAt: string;
};

const SERVICE_DEFS: readonly ServiceDef[] = [
	{
		id: "spotify",
		name: "Spotify API Wrapper",
		healthUrl: "https://api.ncc.dev/spotify/health",
		uptime7d: 99.99
	},
	{
		id: "images",
		name: "Image Host",
		healthUrl: "https://images.nanos.club/health?deep=1",
		uptime7d: 99.99
	},
	{
		id: "fortnite",
		name: "Fortnite Shop API Wrapper",
		healthUrl: "https://api.ncc.dev/fn/health?deep=1",
		uptime7d: 99.99
	},
	{
		id: "ifn",
		name: "IFN Auth Microservice",
		healthUrl: "https://api.ncc.dev/ifn/authentication/health",
		uptime7d: 100.0
	}
] as const;

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

const statusLabel = (s: Statuses) => {
	switch (s) {
		case "operational":
			return "Operational";
		case "degraded":
			return "Degraded";
		case "partialOutage":
			return "Partial outage";
		case "majorOutage":
			return "Major outage";
		case "maintenance":
			return "Maintenance";
		default:
			return "Maintenance";
	}
};

const badgeClass = (s: Statuses) => {
	switch (s) {
		case "operational":
			return "border-emerald-500/30 bg-emerald-500/10 text-emerald-200";
		case "degraded":
			return "border-amber-500/30 bg-amber-500/10 text-amber-200";
		case "partialOutage":
			return "border-orange-500/30 bg-orange-500/10 text-orange-200";
		case "majorOutage":
			return "border-rose-500/30 bg-rose-500/10 text-rose-200";
		case "maintenance":
		default:
			return "border-violet-500/30 bg-violet-500/10 text-violet-200";
	}
};

const incidentChip = (s: Incident["status"]) => {
	switch (s) {
		case "investigating":
			return "border-amber-500/30 bg-amber-500/10 text-amber-200";
		case "identified":
			return "border-orange-500/30 bg-orange-500/10 text-orange-200";
		case "monitoring":
			return "border-sky-500/30 bg-sky-500/10 text-sky-200";
		case "resolved":
		default:
			return "border-emerald-500/30 bg-emerald-500/10 text-emerald-200";
	}
};

const overallFrom = (services: Service[]): Statuses => {
	const worst: Record<Statuses, number> = {
		operational: 0,
		degraded: 1,
		maintenance: 2,
		partialOutage: 3,
		majorOutage: 4
	};
	return services.reduce<Statuses>((acc, cur) => (worst[cur.status] > worst[acc] ? cur.status : acc), "operational");
};

const fmtLocal = (ts: string) => {
	const d = new Date(ts);
	if (Number.isNaN(d.getTime())) return ts;
	return d.toLocaleString([], { month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" });
};

const statusFromHealth = (body: HealthResponse, httpOk: boolean): Statuses => {
	const ok = (httpOk && (body.ok ?? true)) || body.ok === true || body.status === "ok";
	if (ok) return "operational";
	if (body.mode === "deep" && body.tokenOk) return "degraded";
	return "majorOutage";
};

const latencyFromHealth = (body: HealthResponse, measuredMs: number): number => {
	const x = body.latencyMs ?? body.spotifyLatencyMs ?? body.totalMs;
	if (typeof x === "number" && Number.isFinite(x)) return Math.max(0, Math.round(x));
	return Math.max(0, Math.round(measuredMs));
};

const Status = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const rafRef = useRef<number | null>(null);

	const { services, lastUpdatedAt, loading: _loading, error: _error, refresh: _refresh } = useServicePolling(SERVICE_DEFS, {
		intervalMs: 15_000,
		initialStatus: "maintenance",
		defaultUptime7d: 99.99,
		statusFromHealth,
		latencyFromHealth
	});

	const [incidents, _setIncidents] = useState<Incident[]>([
		// {
		// 	id: "authlatency",
		// 	title: "Elevated auth latency",
		// 	status: "resolved",
		// 	startedAt: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
		// 	updatedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString()
		// }
	]);

	const overall = useMemo(() => overallFrom(services), [services]);

	const { avgLatency, minUptime } = useMemo(() => {
		let sum = 0;
		let count = 0;
		let min = Number.POSITIVE_INFINITY;

		for (const s of services) {
			if (s.latencyMs > 0) {
				sum += s.latencyMs;
				count += 1;
			}
			min = Math.min(min, s.uptime7d);
		}

		const avg = count ? Math.round(sum / count) : NaN;
		return { avgLatency: avg, minUptime: min === Number.POSITIVE_INFINITY ? NaN : min };
	}, [services]);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d", { alpha: true });

		if (!canvas || !ctx) return;

		const stars: Star[] = [];
		for (let i = 0; i < 280; i++) stars.push({ x: Math.random(), y: Math.random(), r: rand(0.4, 1.9), a: rand(0.18, 0.95) });

		const meteors: Meteor[] = [];

		const resize = () => {
			const parent = canvas.parentElement;
			const w = parent ? parent.clientWidth : window.innerWidth;
			const h = parent ? parent.clientHeight : window.innerHeight;
			const dpr = window.devicePixelRatio || 1;
			canvas.width = Math.floor(w * dpr);
			canvas.height = Math.floor(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		const spawnMeteor = (w: number, h: number) => {
			const fromTop = Math.random() < 0.5;
			const x = fromTop ? rand(0.1 * w, 0.95 * w) : rand(-0.2 * w, 0.3 * w);
			const y = fromTop ? rand(-0.25 * h, 0.25 * h) : rand(0.05 * h, 0.7 * h);
			const speed = rand(700, 1200);
			const angle = rand(Math.PI * 0.66, Math.PI * 0.78);
			const vx = Math.cos(angle) * speed;
			const vy = Math.sin(angle) * speed;
			const max = rand(0.7, 1.15);
			const mw = rand(1.4, 2.6);
			meteors.push({ x, y, vx, vy, life: max, max, w: mw });
			if (meteors.length > 8) meteors.shift();
		};

		resize();
		window.addEventListener("resize", resize);

		let last = performance.now();

		const draw = (t: number) => {
			const dt = clamp((t - last) / 1000, 0, 0.05);
			last = t;

			const w = canvas.clientWidth;
			const h = canvas.clientHeight;

			ctx.clearRect(0, 0, w, h);

			const g = ctx.createRadialGradient(w * 0.55, h * 0.25, 0, w * 0.55, h * 0.25, Math.max(w, h) * 0.85);
			g.addColorStop(0, "rgba(236,186,22,0.10)");
			g.addColorStop(0.38, "rgba(120,80,255,0.07)");
			g.addColorStop(1, "rgba(0,0,0,0)");
			ctx.fillStyle = g;
			ctx.fillRect(0, 0, w, h);

			const tw = (t / 1000) * 0.6;
			for (let i = 0; i < stars.length; i++) {
				const s = stars[i];
				const x = s.x * w;
				const y = s.y * h;
				const pulse = 0.65 + 0.35 * Math.sin(tw + (s.x + s.y) * 12.0);
				const a = clamp(s.a * pulse, 0.06, 0.98);
				ctx.beginPath();
				ctx.fillStyle = `rgba(255,255,255,${a})`;
				ctx.arc(x, y, s.r, 0, Math.PI * 2);
				ctx.fill();
			}

			if (Math.random() < 0.055) spawnMeteor(w, h);

			for (let i = meteors.length - 1; i >= 0; i--) {
				const m = meteors[i];
				m.life -= dt;
				m.x += m.vx * dt;
				m.y += m.vy * dt;

				const k = clamp(m.life / m.max, 0, 1);
				const tail = 180 + 280 * (1 - k);

				const n = Math.hypot(m.vx, m.vy) || 1;
				const tx = m.x - (m.vx / n) * tail;
				const ty = m.y - (m.vy / n) * tail;

				const grad = ctx.createLinearGradient(m.x, m.y, tx, ty);
				grad.addColorStop(0, `rgba(255,255,255,${0.95 * k})`);
				grad.addColorStop(0.25, `rgba(236,186,22,${0.55 * k})`);
				grad.addColorStop(1, "rgba(120,80,255,0)");

				ctx.lineWidth = m.w;
				ctx.strokeStyle = grad;
				ctx.beginPath();
				ctx.moveTo(m.x, m.y);
				ctx.lineTo(tx, ty);
				ctx.stroke();

				if (m.life <= 0 || m.x > w * 1.3 || m.y > h * 1.3) meteors.splice(i, 1);
			}

			rafRef.current = requestAnimationFrame(draw);
		};

		rafRef.current = requestAnimationFrame(draw);

		// eslint-disable-next-line consistent-return
		return () => {
			window.removeEventListener("resize", resize);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			rafRef.current = null;
		};
	}, []);

	return (
		<>
			<Helmet>
				<title>StarfallEx Status</title>
				<meta property="og:site_name" content="nanos.club" />
				<meta property="og:title" content="StarfallEx Status" />
				<meta property="og:description" content="Live health for services and incidents." />
				<meta property="og:image" content="" />
			</Helmet>

			<div className="relative w-full min-h-screen overflow-hidden border border-neutral-800/60 bg-neutral-950">
				<canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
				<div className="absolute inset-0 bg-gradient-to-b from-neutral-950/25 via-neutral-950/70 to-neutral-950" />

				<div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14">
					<div className="flex flex-wrap items-center justify-between gap-4">
						<div>
							<div className="inline-flex items-center gap-2 rounded-full border border-neutral-800/70 bg-neutral-900/40 px-3 py-1 text-xs font-semibold tracking-wide text-neutral-200">
								<span className="h-1.5 w-1.5 rounded-full bg-[#ecba16]" />
								StarfallEx Status
								<span className="text-neutral-400">/</span>
								<span className="text-neutral-400">ncc.dev</span>
							</div>
							<h1 className="mt-4 text-3xl font-black tracking-tight text-neutral-50 sm:text-4xl">System Status</h1>
							<p className="mt-2 text-sm text-neutral-300">Live health for services and incidents.</p>
						</div>

						<div className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-extrabold ${badgeClass(overall)}`}>
							<span className="h-2 w-2 rounded-full bg-current" />
							{statusLabel(overall)}
						</div>
					</div>

					<div className="mt-8 grid gap-3 sm:grid-cols-3">
						<div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/30 p-4 backdrop-blur">
							<div className="text-xs font-extrabold tracking-wide text-neutral-200">Avg latency</div>
							<div className="mt-2 text-2xl font-black text-neutral-50">{Number.isFinite(avgLatency) ? `${avgLatency}ms` : "—"}</div>
							<div className="mt-1 text-xs text-neutral-400">Across responding services</div>
						</div>

						<div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/30 p-4 backdrop-blur">
							<div className="text-xs font-extrabold tracking-wide text-neutral-200">7-day uptime (min)</div>
							<div className="mt-2 text-2xl font-black text-neutral-50">{Number.isFinite(minUptime) ? `${minUptime.toFixed(2)}%` : "—"}</div>
							<div className="mt-1 text-xs text-neutral-400">Worst service over 7 days</div>
						</div>

						<div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/30 p-4 backdrop-blur">
							<div className="text-xs font-extrabold tracking-wide text-neutral-200">Last update</div>
							<div className="mt-2 text-2xl font-black text-neutral-50">
								{lastUpdatedAt ? fmtLocal(lastUpdatedAt) : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
							</div>
							<div className="mt-1 text-xs text-neutral-400">Auto-refresh every 15s</div>
						</div>
					</div>

					<div className="mt-10 rounded-3xl border border-neutral-800/70 bg-neutral-900/25 backdrop-blur">
						<div className="flex items-center justify-between gap-4 border-b border-neutral-800/70 px-5 py-4">
							<div className="text-sm font-extrabold text-neutral-100">Services</div>
							<div className="text-xs font-semibold text-neutral-400">{services.length} monitored</div>
						</div>

						<div className="grid gap-3 p-5 sm:grid-cols-2">
							{services.map((s) => (
								<div key={s.id} className="rounded-2xl border border-neutral-800/70 bg-neutral-950/40 p-4">
									<div className="flex items-start justify-between gap-3">
										<div>
											<div className="text-sm font-extrabold text-neutral-100">{s.name}</div>
											<div className="mt-1 text-xs text-neutral-400">
												{s.latencyMs}ms · {s.uptime7d.toFixed(2)}% (7d)
											</div>
										</div>
										<div className={`shrink-0 rounded-xl border px-2.5 py-1 text-xs font-extrabold ${badgeClass(s.status)}`}>
											{statusLabel(s.status)}
										</div>
									</div>

									<div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-neutral-900/60">
										<div className="h-full bg-[#ecba16]/70" style={{ width: `${clamp(s.uptime7d, 0, 100)}%` }} />
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="mt-10 rounded-3xl border border-neutral-800/70 bg-neutral-900/25 backdrop-blur">
						<div className="flex items-center justify-between gap-4 border-b border-neutral-800/70 px-5 py-4">
							<div className="text-sm font-extrabold text-neutral-100">Incidents</div>
							<div className="text-xs font-semibold text-neutral-400">{incidents.length ? "Latest activity" : "No active incidents"}</div>
						</div>

						<div className="p-5">
							{incidents.length === 0 ? (
								<div className="rounded-2xl border border-neutral-800/70 bg-neutral-950/40 p-5 text-sm text-neutral-300">All systems normal.</div>
							) : (
								<div className="grid gap-3">
									{incidents.map((i) => (
										<div key={i.id} className="rounded-2xl border border-neutral-800/70 bg-neutral-950/40 p-4">
											<div className="flex flex-wrap items-start justify-between gap-3">
												<div>
													<div className="text-sm font-extrabold text-neutral-100">{i.title}</div>
													<div className="mt-1 text-xs text-neutral-400">
														Started {fmtLocal(i.startedAt)} · Updated {fmtLocal(i.updatedAt)}
													</div>
												</div>
												<div className={`rounded-xl border px-2.5 py-1 text-xs font-extrabold ${incidentChip(i.status)}`}>
													{i.status.toUpperCase()}
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>

					<div className="mt-10 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-neutral-400">
						<div className="inline-flex items-center gap-2">
							<span className="rounded-lg border border-neutral-800/70 bg-neutral-900/40 px-2 py-1">status</span>
							<span className="rounded-lg border border-neutral-800/70 bg-neutral-900/40 px-2 py-1">incidents</span>
							<span className="rounded-lg border border-neutral-800/70 bg-neutral-900/40 px-2 py-1">history</span>
						</div>
						<div>© {new Date().getFullYear()} ncc.dev</div>
					</div>
				</div>

				<div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#ecba16]/10 blur-3xl" />
				<div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl" />
			</div>
		</>
	);
};

export default Status;
