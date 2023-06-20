import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

interface ToastProps {
	title: string;
	description: string;
	theme: string;
}

const Toast = ({ title, description, theme }: ToastProps) => {
	return (
		<div className={`p-2 px-4 flex flex-row gap-3 items-center ${theme} rounded-xl`}>
			<InformationCircleIcon className="w-5 h-5" />
			<div>
				<h3>
					{title}
				</h3>
				<p>
					{description}
				</p>
			</div>
		</div>
	);
};

export default Toast;
