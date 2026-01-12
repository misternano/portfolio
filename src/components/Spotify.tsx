import { useEffect, useState } from "react";
import { Circle } from "lucide-react";
import { Progress } from "./index.ts";

const formatTime = (ms: number) => {
	const minutes = Math.floor(ms / 1000 / 60);
	const seconds = Math.floor((ms / 1000 / 60) % 1 * 60);

	return minutes + ":" + seconds.toString().padStart(2, "0");
};

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

const Spotify = () => {
	const [data, setData] = useState<SpotifyProps | undefined>(undefined);

	useEffect(() => {
		const interval = setInterval((async () => {
			try {
				const response = await fetch("https://api.ncc.dev/spotify");
				const json = await response.json();
				setData(json);
			} catch (err) {
				console.error(err);
			}
		}), 2000);

		return () => clearInterval(interval);
	}, []);

	if (!data || !data.is_playing) return null;

	const song = data.item.name.replace(/ *\([^)]*\)/g, "").replace(/ *\[[^\]]*]/g, "").replace(/ - [Rr]ecorded [Aa]t.*/g, "");
	const artists = data.item.artists.map(a => a.name).join(" • ");
	const bar = Math.floor(data.progress_ms / data.item.duration_ms * 100);

	return (
		<div className="md:w-fit sticky right-2 left-2 top-1 z-10">
			<div className="mb-1 px-2 flex flex-row items-center justify-center gap-1 backdrop-blur-sm rounded-full">
				<p className="text-xs font-[archia]">Listening to Spotify</p> <Circle size="8" className="stroke-[#1fdf64] fill-[#1fdf64] animate-pulse" />
			</div>
			<div className="group md:w-96 backdrop-blur-sm ring-1 ring-border bg-neutral-800/10 hover:ring-[#1fdf64]/75 bg-background rounded-lg transition-all">
				<a href={`https://open.spotify.com/track/${data.item.id}`} target="norel noopen">
					<div className="relative p-1.5 flex flex-row gap-2">
						<img className="h-20 w-20 rounded-[6px]" src={data.item.album.images[0].url} alt="Album Cover" title={data.item.album.name} />
						<div className="w-full flex flex-col justify-between">
							<div className="h-full flex flex-col justify-center">
								<p className="w-64 whitespace-nowrap text-ellipsis overflow-hidden text-primary" title={song}>
									{song}
								</p>
								<p className="w-64 whitespace-nowrap text-ellipsis overflow-hidden text-secondary-foreground/50" title={artists}>
									{artists}
								</p>
							</div>
							<div>
								<div className="flex justify-between">
									<span id="timestamp">
										{formatTime(data.progress_ms)}
									</span>
									<span id="timestamp">
										{formatTime(data.item.duration_ms)}
									</span>
								</div>
								<Progress value={bar} className="h-1" />
							</div>
						</div>
					</div>
				</a>
			</div>
		</div>
	);
};

export default Spotify;
