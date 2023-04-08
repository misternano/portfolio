import React from "react";
import placeholder from "../assets/placeholder.png";
import { motion } from "framer-motion";

const ProjectCard = ({ src, name, desc, url }) => {
	return (
		// TODO: add a modal to see project details
		<motion.div whileHover={{ y: -5 }} className="flex flex-col bg-neutral-800/50 border border-[2px] border-neutral-700 rounded-md glow hover:border-neutral-500 transition-all duration-200">
			<img className="rounded-md w-full h-auto" src={src ? `docs/${src}.png` : placeholder} alt={`Image of project "${name}"`} loading="lazy" />
			<div className="p-2 flex flex-col items-center">
				<h3 className="w-full text-center text-xl font-medium border-b-2 border-neutral-700 pb-2">
					{name}
				</h3>
				<p className="p-4 pb-2 text-center">
					{desc}
				</p>
				<a href={`https://${url}`} target="norel noopen" className={`${url ? "inline" : "hidden"} text-brand hover:text-brand/75 transition-colors external-link`}>
					{url}
				</a>
			</div>
		</motion.div>
	);
};

export default ProjectCard;
