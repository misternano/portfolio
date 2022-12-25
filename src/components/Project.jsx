import React from "react";
import placeholder from "../assets/placeholder.png"

const Project = ({ src, name, desc, url }) => {
	return (
		<div className="flex flex-col bg-neutral-800/50 border border-neutral-700 rounded-md drop-shadow">
			<img className="rounded w-full h-auto" src={src ? `docs/${src}.png` : placeholder} alt="Project Image" loading="lazy" />
			<div className="p-2 flex flex-col items-center">
				<h3 className="w-full text-center text-xl font-medium border-b-2 border-neutral-700 pb-2">
					{name}
				</h3>
				<p className="p-4 pb-2 text-center">
					{desc}
				</p>
				<a href={`https://${url}`} target="norel noopen" className={`${url ? "inline" : "hidden"} text-indigo-600 hover:text-indigo-500 transition-colors`}>
					{url}
				</a>
			</div>
		</div>
	);
};

export default Project;
