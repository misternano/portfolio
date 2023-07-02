import React from "react";
import { Tech } from "../types";

const TechCard: React.FC<{ tech: Tech }> = ({ tech }) => {
	return (
		<div className="-z-10 min-w-fit p-2 md:p-4 flex flex-col gap-2 justify-center items-center bg-smallcard border border-neutral-700 rounded-xl glow hover:border-neutral-500 transition-colors duration-200">
			<div className="flex flex-row gap-2 items-center">
				<img src={`../assets/svg/${tech.image}.svg`} alt={`${tech.name} Logo`} className="w-6 h-auto aspect-square rounded" />
				<p className="text-xl font-semibold">{tech.name}</p>
			</div>
			<span className="p-0.5 px-1.5 text-xs uppercase border border-yellow-600 bg-yellow-500/20 text-yellow-500 rounded-md">
				{tech.type}
			</span>
		</div>
	);
};

export default TechCard;
