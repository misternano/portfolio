import React from "react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

interface ToastProps {
	theme: string,
	title: string,
	description: string
}

const Toast = ({ theme, title, description }: ToastProps) => {
	return (
		<div className={`w-full select-none max-w-6xl flex mt-1 flex-row gap-3 
			items-center ${theme} rounded-lg p-2 px-4 text-white`}
		>
			<InformationCircleIcon className="h-6 w-6" />
			<div>
				<p className="font-bold">
					{title}
				</p>
				<p className="text-sm">
					{description}
				</p>
			</div>
		</div>
	);
};

export default Toast;
