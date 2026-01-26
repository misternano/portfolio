import { useEffect, useState } from "react";
import { SpotifyNowPlaying, SpotifyRecentOrTop } from "@/types";

type SpotifyType = "recent" | "top" | undefined;
type SpotifyData<T extends SpotifyType> = T extends "recent" | "top"
	? SpotifyRecentOrTop
	: SpotifyNowPlaying;

const useSpotify = <T extends SpotifyType = undefined>(pollMs = 2000, type?: T) => {
	const [data, setData] = useState<SpotifyData<T> | null>(null);
	const [error, setError] = useState<unknown>(null);

	useEffect(() => {
		let alive = true;

		const tick = async () => {
			try {
				const suffix = type ? `/${type}` : "";
				const res = await fetch(`https://api.ncc.dev/spotify${suffix}`);
				const json = (await res.json()) as SpotifyData<T>;
				if (!alive) return;
				setData(json);
				setError(null);
			} catch (e) {
				if (!alive) return;
				setError(e);
			}
		};

		(async () => {
			await tick();
		})();

		const id = window.setInterval(async () => {
			try {
				await tick();
			} catch (e) {
				setError(e);
			}
		}, pollMs);

		return () => {
			alive = false;
			window.clearInterval(id);
		};
	}, [pollMs]);

	return { data, error };
};

export default useSpotify;
