import placeholder from "../assets/images/album.png";
import { useEffect, useState } from "react";
import { Circle } from "lucide-react";
import tippy from "tippy.js";

interface SpotifyProps {
	listening_to_spotify: boolean;
	spotify: {
		track_id: string;
		album_art_url: string;
		artist: string;
		song: string;
		album: string;
	}
}

const Spotify = () => {
	const [data, setData] = useState<SpotifyProps | null>(null);

	const fetchData = async () => {
		const response = await fetch("https://api.lanyard.rest/v1/users/272535850200596480");
		const body = await response.json();
		setData(body.data);
	};

	useEffect(() => {
		fetchData();
		const interval = setInterval((async () => {
			try {
				await fetchData();
			} catch (err) {
				console.error(err);
			}
		}), 10000);
		return () => clearInterval(interval);
	}, []);

	if (!data || !data?.listening_to_spotify)
		return null;

	const song = data.spotify?.song.replace(/ *\([^)]*\)/g, "").replace(/ *\[[^\]]*]/g, "").replace(/ - [Rr]ecorded [Aa]t.*/g, "");
	const artist = data.spotify?.artist.replace(/;/g, " •");

	tippy("#spotify", {
		content: `Listen to ${song} on Spotify`,
		placement: "bottom"
	});

	return (
		<div className="fixed md:w-80 top-2 md:top-1 left-2 right-2 md:right-0 z-40">
			<div className="w-fit mx-auto mb-1 px-2 flex flex-row items-center gap-1 backdrop-blur-sm rounded-full">
				<p className="text-xs">Listening to Spotify</p> <Circle size="8" className="stroke-spotify fill-spotify animate-pulse" />
			</div>
			<a href={`https://open.spotify.com/track/${data.spotify?.track_id}`} id="spotify" target="norel noopen" className="group p-2 flex flex-row gap-2 bg-neutral-800/50 border border-neutral-700 hover:border-spotify backdrop-blur-sm rounded-xl transition-colors">
				<img className="h-16 w-16 rounded-md" src={data.spotify?.album_art_url ? data.spotify?.album_art_url : placeholder} alt={`${data.spotify?.album} Album Cover`} />
				<div className="w-full truncate flex flex-col justify-between">
					<div className="h-full w-full flex flex-col justify-center">
						<p className="truncate text-white">
							{song}
						</p>
						<p className="truncate text-neutral-400">
							by {artist}
						</p>
					</div>
				</div>
			</a>
		</div>
	);
};

export default Spotify;
