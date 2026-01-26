import { useSpotify } from "@/hooks";
import { useMemo } from "react";

const SpotifyTop = () => {
	const { data } = useSpotify(2000, "top");

	const positions = useMemo(() => {
		const rand = () => `${Math.floor(Math.random() * 101)}% ${Math.floor(Math.random() * 101)}%`;
		return data?.items.map(() => rand()) ?? [];
	}, [data?.items?.length]);

	return (
		<section>
			<div className="mb-6 w-full text-center">
				<h2 className="pb-0">What I&#39;ve Been Listening To</h2>
				<h3 className="w-1/3 mx-auto separator-hr">Top played this month</h3>
			</div>
			<div className="grid grid-cols-5 gap-4">
				{data?.items.map((item, i) => {
					const song = item.name.replace(/ *\([^)]*\)/g, "").replace(/ *\[[^\]]*]/g, "").replace(/ - [Rr]ecorded [Aa]t.*/g, "");
					return (
						<a
							key={item.trackId}
							href={`https://open.spotify.com/track/${item.trackId}`} target="norel noopen"
							className="p-1.5 bg-card2 flex flex-row items-center gap-2 border border-neutral-700 hover:border-[#1fdf64]/50 rounded-lg"
							style={{ backgroundPosition: positions[i] }}
						>
							<img src={item.albumArt} alt={item.album} className="h-20 w-20 rounded-[6px]" />
							<div className="flex flex-col">
								<p className="text-brand">{song}</p>
								<p className="text-neutral-200">{item.artists}</p>
							</div>
						</a>
					);
				})}
			</div>
		</section>
	);
};

export default SpotifyTop;
