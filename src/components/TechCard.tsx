import type { Tech } from "../types";

const TechCard = ({ tech }: { tech: Tech }) => {
	return (
		<a href={`https://${tech.url}/`} target="norel noopen" className="lg:first:ml-0 lg:last:mr-0 first:ml-2 last:mr-2 min-w-fit p-2 md:p-4 flex flex-col gap-2 justify-center items-center bg-card border border-neutral-700 rounded-lg glow hover:border-neutral-500 transition-colors duration-200">
			<div className="flex flex-row gap-2 items-center">
				<img src={`../assets/svg/${tech.image}.svg`} alt={`${tech.name} Logo`} className="w-6 h-auto aspect-square rounded" />
				<p className="text-xl font-semibold">{tech.name}</p>
			</div>
			<span className="p-0.5 px-1.5 text-xs font-archia uppercase border border-yellow-600 bg-brand/20 text-brand rounded-md">
				{tech.type}
			</span>
		</a>
	);
};

export default TechCard;
