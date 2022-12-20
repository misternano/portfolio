/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import placeholder from "../assets/album.png";

const formatTime = (ms) => {
	const minutes = Math.floor(ms / 1000 / 60);
	const seconds = Math.floor((ms / 1000 / 60) % 1 * 60);

	return minutes + ":" + seconds.toString().padStart(2, "0");
};

const SpotifyListener = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const interval = setInterval((async () => {
			try {
				const response = await fetch("https://nanos.club/api/spotify");
				const json = await response.json();

				setData(json);
			} catch (err) {
				console.error(err);
			}
		}), 2000);

		return () => clearInterval(interval);
	}, []);

	if (!data || !data.is_playing)
		return null;

	const song = data.item.name.replace(/ *\([^)]*\)/g, "").replace(/ *\[[^\]]*]/g, "").replace(/ - [Rr]ecorded [Aa]t.*/g, "");
	const artists = data.item.artists.map(a => a.name).join(" • ");
	const album = data.item.album.name;
	const albumCover = data.item.album.images[0].url;
	const trackID = data.item.id;
	const progress = data.progress_ms;
	const length = data.item.duration_ms;

	const bar = Math.floor(progress / length * 100);

	return (
		<div className="absolute md:w-96 md:left-5 md:top-5 right-2 left-2 top-2 bg-neutral-800/50 backdrop-blur-sm border border-spotify/75 hover:border-spotify rounded-lg transition-all group">
			<a href={`https://open.spotify.com/${trackID ? "track/"+trackID : "" }`} target="norel noopen">
				<div className="relative p-1.5 flex flex-row gap-2">
					<svg className="h-6 w-6 absolute right-2 top-2 fill-white group-hover:fill-spotify transition-colors" viewBox="0 0 496 512">
						<path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"/>
					</svg>
					<img className={`h-24 w-24 rounded ${albumCover ? "" : "animate-spin-slow"}`} src={albumCover ? albumCover : placeholder} alt="Album Cover" title={`${album ? album : "An error occurred"}`} />
					<div className="w-full flex flex-col justify-between">
						<div className="h-full flex flex-col justify-center">
							<p className="w-60 whitespace-nowrap text-ellipsis overflow-hidden text-white" title={song ? song : "An error occurred"}>
								{song ? song : "An error occurred"}
							</p>
							<p className="w-60 whitespace-nowrap text-ellipsis overflow-hidden text-neutral-400" title={artists ? artists : "An error occurred"}>
								{artists ? artists : "An error occurred"}
							</p>
						</div>
						<div>
							<div className="flex justify-between">
								<span id="timestamp">
									{formatTime(progress)}
								</span>
								<span id="timestamp">
									{formatTime(length)}
								</span>
							</div>
							<div className="relative">
								<div className="w-full h-1.5 bg-neutral-500 rounded-full" />
								<div className="absolute h-1.5 top-0 bg-spotify rounded-full transition-all ease" style={{ width: bar + "%" }} />
							</div>
						</div>
					</div>
				</div>
			</a>
		</div>
	);
};

export default SpotifyListener;
