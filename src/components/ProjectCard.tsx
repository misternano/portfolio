import { useState } from "react";
import type { Project } from "../types";
import placeholder from "../assets/images/placeholder.png";
import { Pencil, Trash, X } from "lucide-react";
import { useSpring, animated } from "react-spring";
import { useClickOutside, useAuth } from "../hooks";
import { useToasts } from "../hooks";

const calc = (x: number, y: number) => [
	-(y - window.innerHeight / 2) / 200,
	-(x - window.innerWidth / 2) / 200,
	1.05
];

const trans = (x: number, y: number, s: number): string => `perspective(200px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

// TODO: Add functionality to edit and delete buttons
const ProjectCard= ({ project }: { project: Project }) => {
	const { user } = useAuth();
	const toast = useToasts();
	const [confirmDeleteModal, setConfirmDeleteModal] = useState<boolean>(false);
	const [props, set] = useSpring(() => ({
		xys: [0, 0, 1],
		config: { mass: 2, tension: 350, friction: 25 }
	}));

	const modalRef = useClickOutside(() => {
		setConfirmDeleteModal(false);
	});

	const checkImmunityBeforeDelete = () => {
		if (project.immune) toast("Error", `${project.name} cannot be deleted.`, 2500, "bg-rose-500");
		else {
			setConfirmDeleteModal(false);
			toast("Success", `Deleted "${project.name}"`, 2500, "bg-emerald-500");
			// TODO: handle deletion
		}
	};

	return (
		<>
			<animated.div onMouseMove={({ clientX: x, clientY: y }: { clientX: number; clientY: number }) => set({ xys: calc(x, y) })} onMouseLeave={() => set({ xys: [0, 0, 1] })} style={{ transform: props.xys.to(trans) }} className="relative group z-0 hover:z-10">
				{user && (
					<div className="z-10 absolute -top-2 right-2 hidden group-hover:flex flex-row bg-neutral-900 border border-neutral-700 rounded-lg overflow-hidden">
						<button className="group/edit py-1 px-2 hover:bg-neutral-800 focus:bg-neutral-800">
							<Pencil size="20" className="stroke-neutral-300 group-hover/edit:stroke-white group-focus/edit:stroke-white" />
						</button>
						{!project.immune && (
							<button onClick={() => setConfirmDeleteModal(true)} className="group/delete py-1 px-2 hover:bg-neutral-800 focus:bg-neutral-800">
								<Trash size="20" className="stroke-red-400 group-hover/delete:stroke-rose-500 group-focus/delete:stroke-rose-500" />
							</button>
						)}
					</div>
				)}
				<div className="h-full flex flex-col bg-card border border-neutral-700 rounded-xl overflow-hidden group-hover:border-b-transparent group-hover:rounded-b-none">
					<img src={project.image ? `assets/images/${project.image}.png` : placeholder} alt={`${project.name} Project`} className="w-full h-auto rounded-b-xl drop-shadow" loading="lazy" />
					<div className="h-full p-2 flex flex-col items-center justify-between">
						<div className="w-full">
							<h3 className="text-center text-xl text-brand font-medium border-b border-neutral-700 pb-2">
								{project.name}
							</h3>
							<p className="p-2 pb-0 text-center">
								{project.desc}
							</p>
						</div>
					</div>
				</div>
				<div className="absolute left-0 right-0 hidden group-hover:block">
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
								<span key={index} className="p-0.5 px-1.5 flex-grow text-center text-xs font-archia uppercase border border-yellow-600 bg-brand/20 text-brand rounded-md">
									{stack}
								</span>
							))}
						</div>
					</div>
				</div>
			</animated.div>
			{!project.immune && confirmDeleteModal && (
				<div className="fixed inset-0 z-10 flex items-center justify-center bg-neutral-800/50">
					<div ref={modalRef} className="min-w-[20rem] p-4 flex flex-col gap-4 bg-neutral-900 border border-neutral-700 rounded-xl">
						<div className="flex flex-row justify-between items-center">
							<p className="font-medium text-sm text-neutral-300">Delete Project</p>
							<button onClick={() => setConfirmDeleteModal(false)} className="group border border-transparent hover:border-red-500 rounded-md p-0.5">
								<X size="16" className="group-hover:stroke-red-500" />
							</button>
						</div>
						<div>
							<p className="text-center">
								Are you sure you want to delete <span className="text-brand">{project.name}</span>?
							</p>
							<p className="text-center text-sm text-red-400">
								This action cannot be undone.
							</p>
						</div>
						<div className="flex flex-row gap-4 justify-center">
							<button onClick={() => setConfirmDeleteModal(false)} className="flex-grow p-1 bg-neutral-500 hover:bg-neutral-500/80 rounded transition-colors">
								Cancel
							</button>
							<button onClick={checkImmunityBeforeDelete} className="flex-grow p-1 bg-red-500 hover:bg-red-500/80 rounded transition-colors">
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProjectCard;
