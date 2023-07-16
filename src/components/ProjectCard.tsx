import React from "react";
import { Project } from "../types.ts";
import placeholder from "../assets/placeholder.png";
import { Pencil, Trash } from "lucide-react";

// TODO: Add functionality to edit and delete buttons
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
	return (
		<div className="relative group/wrapper">
			<div className="z-10 absolute -top-2 right-2 hidden group-hover/wrapper:flex flex-row bg-neutral-900 border border-neutral-700 rounded-lg overflow-hidden">
				<button className="group py-1 px-2 hover:bg-neutral-800 focus:bg-neutral-800">
					<Pencil size="20" className="stroke-neutral-300 group-hover:stroke-white group-focus:stroke-white" />
				</button>
				<button className="group py-1 px-2 hover:bg-neutral-800 focus:bg-neutral-800">
					<Trash size="20" className="stroke-red-400 group-hover:stroke-rose-500 group-focus:stroke-rose-500" />
				</button>
			</div>
			<div className="h-full flex flex-col bg-card border border-neutral-700 rounded-xl overflow-hidden">
				<img src={project.image ? `images/${project.image}.png` : placeholder} alt={`${project.name} Project`} className="w-full h-auto rounded-b-xl drop-shadow" loading="lazy" />
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
		</div>
	);
};

export default ProjectCard;
