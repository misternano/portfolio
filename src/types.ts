export interface Project {
	image?: string;
	name: string;
	desc: string;
	url?: string;
	source?: string | string[];
	stack: string[];
	immune?: boolean;
}

export interface Tech {
	image: string;
	name: string;
	type: string;
	url: string;
}

// Service Polling
export type Statuses = "operational" | "degraded" | "partialOutage" | "majorOutage" | "maintenance";

export interface Service {
	id: string;
	name: string;
	status: Statuses;
	latencyMs: number;
	uptime7d: number;
}

export interface ServiceDef {
	id: Service["id"];
	name: Service["name"];
	healthUrl: string;
	uptime7d?: number;
}

export interface HealthResponse {
	ok?: boolean;
	status?: "ok" | "fail";
	mode?: "shallow" | "deep";
	tokenOk?: boolean;
	spotifyOk?: boolean;
	spotifyLatencyMs?: number | null;
	totalMs?: number;
	latencyMs?: number;
}

export interface UseServicePollingOptions {
	intervalMs?: number;
	initialStatus?: Statuses;
	defaultUptime7d?: number;
	fetcher?: typeof fetch;
	statusFromHealth: (_body: HealthResponse, _httpOk: boolean) => Statuses;
	latencyFromHealth: (_body: HealthResponse, _measuredMs: number) => number;
}

export interface UseServicePollingResult {
	services: Service[];
	lastUpdatedAt: string | null;
	loading: boolean;
	error: unknown | null;
	refresh: () => Promise<void>;
}
