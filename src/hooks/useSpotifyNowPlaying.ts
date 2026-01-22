import { useEffect, useState } from "react";

interface SpotifyProps {
	is_playing: boolean;
	timestamp: Date;
	progress_ms: number;
	item: {
		id: string;
		name: string;
		duration_ms: number;
		album: {
			name: string;
			images: {
				url: string;
			}[]
		}
		artists: {
			name: string;
		}[]
	}
}

const useSpotifyNowPlaying = (pollMs = 2000) => {
	const [data, setData] = useState<SpotifyProps | null>(null);
	const [error, setError] = useState<unknown>(null);

	useEffect(() => {
		let alive = true;

		const tick = async () => {
			try {
				const res = await fetch("https://api.ncc.dev/spotify");
				const json = (await res.json()) as SpotifyProps;
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

export default useSpotifyNowPlaying;
