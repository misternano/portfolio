import React from "react";
import placeholder from "../assets/placeholder.png"

const Project = ({ src, name, desc, connect }) => {
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
				<p className="text-indigo-600 select-text">
					{connect?.join(" • ")}
				</p>
			</div>
		</div>
	);
};

export default Project;
