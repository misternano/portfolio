import React from "react";
import { Project } from "../types.ts";
import placeholder from "../assets/placeholder.png";

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
	return (
		// TODO: add a modal to see project details
		<div className="flex flex-col bg-gradient border border-neutral-700 rounded-xl glow hover:border-neutral-500 transition-all duration-200 overflow-hidden">
			<img src={project.src ? `docs/${project.src}.png` : placeholder} alt={`${project.name} Project`} className="w-full h-auto" loading="lazy" />
			<div className="h-full p-2 flex flex-col items-center justify-between">
				<div>
					<h4 className="w-full text-center text-xl text-brand font-medium border-b border-neutral-700 pb-2">
						{project.name}
					</h4>
					<p className="p-2 text-center">
						{project.desc}
					</p>
				</div>
				<div className={`${project.url || project.source ? "" : "hidden"} ${project.url && project.source ? "flex flex-row gap-1" : ""}`}>
					{project.url &&
						<a href={`https://${project.url}`} target="norel noopen" className="text-brand hover:text-brand/70 transition-colors external-link">
							{project.url}
						</a>
					}
					{project.url && project.source &&
						<span className="text-neutral-700">&bull;</span>
					}
					{project.source &&
						<a href={`https://${project.source}`} target="norel noopen" className="text-brand hover:text-brand/70 transition-colors external-link">
							Source
						</a>
					}
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
