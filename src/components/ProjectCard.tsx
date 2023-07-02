import React from "react";
import { Project } from "../types.ts";
import placeholder from "../assets/placeholder.png";

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
	return (
		<div className="flex flex-col bg-bigcard border border-neutral-700 rounded-xl overflow-hidden">
			<img src={project.image ? `images/${project.image}.png` : placeholder} alt={`${project.name} Project`} className="w-full h-auto rounded-b-xl drop-shadow-lg" loading="lazy" />
			<div className="h-full p-2 flex flex-col items-center justify-between">
				<div className="w-full">
					<h4 className="text-center text-xl text-brand font-medium border-b border-neutral-700 pb-2">
						{project.name}
					</h4>
					<p className="p-2 pb-0 text-center">
						{project.desc}
					</p>
				</div>
				<div className={`${project.url || project.source ? "" : "hidden"} ${project.url && project.source ? "flex flex-row gap-1" : ""}`}>
					{project.url &&
						<a href={`https://${project.url}`} target="norel noopen" className="text-brand hover:underline-offset-4 transition-all external-link">
							{project.url}
						</a>
					}
					{project.url && project.source &&
						<span className="text-neutral-700">&bull;</span>
					}
					{project.source &&
						<a href={`https://${project.source}`} target="norel noopen" className="text-brand hover:underline-offset-4 transition-all external-link">
							Source
						</a>
					}
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
