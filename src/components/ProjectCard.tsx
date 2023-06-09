import React from "react";
import { motion } from "framer-motion";
import { Project } from "../types.ts";

const ProjectCard: React.FC<{ data: Project }> = ({ data }) => {
	return (
		// TODO: add a modal to see project details
		<motion.div whileHover={{ y: -5 }} className="flex flex-col bg-gradient border border-neutral-700 rounded-xl glow hover:border-neutral-500 transition-all duration-200 overflow-hidden">
			<img className="w-full h-auto rounded-b-md" src={`docs/${data.src}.png`} alt={`${data.name} Project`} loading="lazy" />
			<div className="p-2 flex flex-col items-center">
				<h4 className="w-full text-center text-xl text-brand font-medium border-b-2 border-neutral-700 pb-2">
					{data.name}
				</h4>
				<p className="p-4 pb-2 text-center">
					{data.desc}
				</p>
				<a href={`https://${data.url}`} target="norel noopen" className={`${data.url ? "inline" : "hidden"} text-brand hover:text-brand/70 transition-colors external-link`}>
					{data.url}
				</a>
			</div>
		</motion.div>
	);
};

export default ProjectCard;
