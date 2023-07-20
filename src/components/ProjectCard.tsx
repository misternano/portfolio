import React from "react";
import { Project } from "../types.ts";
import placeholder from "../assets/placeholder.png";
import { Pencil, Trash } from "lucide-react";
import { useSpring, animated } from "react-spring";
import { useUserData } from "../hooks";

const calc = (x: number, y: number) => [
	-(y - window.innerHeight / 2) / 200,
	-(x - window.innerWidth / 2) / 200,
	1.05
];

const trans = (x: number, y: number, s: number): string => `perspective(200px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

// TODO: Add functionality to edit and delete buttons
const ProjectCard= ({ project }: { project: Project }) => {
	const { user } = useUserData();
	const [props, set] = useSpring(() => ({
		xys: [0, 0, 1],
		config: { mass: 2, tension: 350, friction: 40 }
	}));

	return (
		<animated.div onMouseMove={({ clientX: x, clientY: y }: { clientX: number; clientY: number }) => set({ xys: calc(x, y) })} onMouseLeave={() => set({ xys: [0, 0, 1] })} style={{ transform: props.xys.to(trans) }} className="relative group/wrapper z-0 hover:z-10">
			{user && (
				<div className="z-10 absolute -top-2 right-2 hidden group-hover/wrapper:flex flex-row bg-neutral-900 border border-neutral-700 rounded-lg overflow-hidden">
					<button className="group py-1 px-2 hover:bg-neutral-800 focus:bg-neutral-800">
						<Pencil size="20" className="stroke-neutral-300 group-hover:stroke-white group-focus:stroke-white" />
					</button>
					<button className="group py-1 px-2 hover:bg-neutral-800 focus:bg-neutral-800">
						<Trash size="20" className="stroke-red-400 group-hover:stroke-rose-500 group-focus:stroke-rose-500" />
					</button>
				</div>
			)}
			<div className="h-full flex flex-col bg-card border border-neutral-700 rounded-xl overflow-hidden group-hover/wrapper:border-b-0 group-hover/wrapper:rounded-b-none">
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
				</div>
			</div>
			<div className="absolute left-0 right-0 hidden group-hover/wrapper:block">
				<div className="rounded-xl bg-card border border-neutral-700 border-t-0 rounded-t-none">
					<div className="flex flex-row justify-center gap-1">
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
					<div className="p-2 flex flex-row flex-wrap gap-2">
						{project.stack?.map((stack, index) => (
							<div key={index} className="px-2 flex-grow text-center bg-brand rounded-md leading-none">
								<span className="text-xs text-black font-medium uppercase">
									{stack}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</animated.div>
	);
};

export default ProjectCard;
