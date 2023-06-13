import React from "react";
import { Project } from "../types.ts";
import placeholder from "../assets/placeholder.png";

const ProjectCard: React.FC<{ data: Project }> = ({ data }) => {
	return (
		// TODO: add a modal to see project details
		<div className="flex flex-col bg-gradient border border-neutral-700 rounded-xl glow hover:border-neutral-500 transition-all duration-200 overflow-hidden">
			<img src={data.src ? `docs/${data.src}.png` : placeholder} alt={`${data.name} Project`} className="w-full h-auto rounded-b-xl" loading="lazy" />
			<div className="p-2 flex flex-col items-center">
				<h4 className="w-full text-center text-xl text-brand font-medium border-b border-neutral-700 pb-2">
					{data.name}
				</h4>
				<p className="p-2 text-center">
					{data.desc}
				</p>
				<div className={`${data.url ? "inline" : "hidden"} ${data.source ? "flex flex-row gap-1" : ""}`}>
					<a href={`https://${data.url}`} target="norel noopen" className="text-brand hover:text-brand/70 transition-colors external-link">
						{data.url}
					</a>
					{data.source &&
						<>
							<span className="text-neutral-700">&bull;</span>
							<a href={`https://${data.source}`} target="norel noopen" className="text-brand hover:text-brand/70 transition-colors external-link">
								Source
							</a>
						</>
					}
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
