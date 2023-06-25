import React from "react";
import { AlertOctagon } from "lucide-react";

interface ToastProps {
	theme: string,
	title: string,
	description: string
}

const Toast = ({ theme, title, description }: ToastProps) => {
	return (
		<div className={`w-full max-w-6xl mt-1 p-2 px-4 flex flex-row gap-4 items-center ${theme} rounded-lg text-white`}>
			<AlertOctagon className="h-6 w-6" />
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
