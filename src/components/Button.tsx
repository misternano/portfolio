import { MouseEventHandler, ReactElement } from "react";

interface ButtonProps {
	name: string;
	icon: ReactElement;
	onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ name, icon, onClick }: ButtonProps) => {
	return (
		<button onClick={onClick} className="group h-fit py-1 px-3 flex flex-row gap-2 items-center text-base justify-self-end bg-neutral-800 hover:bg-neutral-700/50 rounded-full transition-colors">
			{icon}
			<span className="text-neutral-300 group-hover:text-white transition-colors">{name}</span>
		</button>
	);
};

export default Button;
