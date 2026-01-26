/* eslint-disable no-inline-comments */
import { ReactElement } from "react";
import { AlertCircle, CheckCircle2, Ghost, HelpCircle, Info, Zap } from "lucide-react";

interface ToastProps {
	theme: string,
	title: string,
	description: string,
	icon?: ReactElement
}

const Toast = ({ theme, title, description, icon }: ToastProps) => {
	const renderIconBasedOnTheme = (iconTheme: string) => {
		switch (iconTheme) {
			case "bg-emerald-500": // Success theme
				return <CheckCircle2 size="24" />;
			case "bg-amber-500": // Alert theme
				return <AlertCircle size="24" />;
			case "bg-indigo-500": // Info theme
				return <Info size="24" />;
			case "bg-rose-500": // Error theme
				return <AlertCircle size="24" />;
			case "bg-brand": // Brand theme
				return <Zap size="24" />;
			case "bg-neutral-900": // Neutral theme
				return <Ghost size="24" />;
			default: // Unknown theme
				return <HelpCircle size="24" />;
		}
	};

	return (
		<div className={`${!title || !description ? "w-fit mx-auto" : "w-full"} max-w-6xl mt-1 p-2 px-4 flex flex-row gap-4 items-center ${theme} rounded-xl text-white`}>
			{icon ? icon : renderIconBasedOnTheme(theme)}
			<div>
				<p className="font-bold">
					{title}
				</p>
				{description && (
					<p className="text-sm">
						{description}
					</p>
				)}
			</div>
		</div>
	);
};

export default Toast;
