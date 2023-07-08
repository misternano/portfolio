import React, { MouseEventHandler } from "react";
import { GanttChart } from "lucide-react";

interface ButtonProps {
	name: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ name, onClick }: ButtonProps) => {
	return (
		<button onClick={onClick} className="group h-fit py-1 px-3 flex flex-row gap-1 items-center text-base justify-self-end bg-neutral-800 hover:bg-neutral-700/50 rounded-full transition-colors">
			<GanttChart className="w-4 h-auto stroke-neutral-300 group-hover:stroke-white transition-colors" />
			<span className="text-neutral-300 group-hover:text-white transition-colors">{name}</span>
		</button>
	);
};

export default Button;
