import placeholder from "../assets/images/album.png";
import { useLanyard } from "use-lanyard";

const Spotify = () => {
	const { data } = useLanyard("272535850200596480");

	if (!data || !data?.listening_to_spotify)
		return null;

	return (
		<div className="fixed md:w-80 top-1 left-2 right-2 md:right-0 z-40">
			<div className="mb-1 flex flex-row justify-center items-center gap-1">
				<span className="text-xs">Listening to Spotify</span> <div className="w-1.5 h-1.5 bg-spotify rounded-full animate-pulse" />
			</div>
			<div className="group backdrop-blur-sm bg-neutral-800/50 border border-neutral-700 hover:border-spotify rounded-lg">
				<a href={`https://open.spotify.com/track/${data.spotify?.track_id}`} target="norel noopen" className="p-2 flex flex-row gap-2">
					<img className={`h-16 w-16 rounded ${data.spotify?.album_art_url ? "" : "animate-spin-slow"}`} src={data.spotify?.album_art_url ? data.spotify?.album_art_url : placeholder} alt={`${data.spotify?.album} Album Cover`} title={data.spotify?.album} />
					<div className="w-full truncate flex flex-col justify-between">
						<div className="h-full w-full flex flex-col justify-center">
							<p className="truncate text-white" title={data.spotify?.song.replace(/ *\([^)]*\)/g, "").replace(/ *\[[^\]]*]/g, "").replace(/ - [Rr]ecorded [Aa]t.*/g, "")}>
								{data.spotify?.song.replace(/ *\([^)]*\)/g, "").replace(/ *\[[^\]]*]/g, "").replace(/ - [Rr]ecorded [Aa]t.*/g, "")}
							</p>
							<p className="truncate text-neutral-400" title={data.spotify?.artist}>
								by {data.spotify?.artist.replace(/(.*?); (.*?)/, "$1 • $2")}
							</p>
						</div>
					</div>
				</a>
			</div>
		</div>
	);
};

export default Spotify;
