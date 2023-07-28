import { AlertCircle, CheckCircle2, HelpCircle, Info, Zap } from "lucide-react";

interface ToastProps {
	theme: string,
	title: string,
	description: string
}

const Toast = ({ theme, title, description }: ToastProps) => {
	const renderIconBasedOnTheme = (iconTheme: string) => {
		switch (iconTheme) {
			case "bg-emerald-500":
				return <CheckCircle2 size="24" />;
			case "bg-amber-500":
				return <AlertCircle size="24" />;
			case "bg-indigo-500":
				return <Info size="24" />;
			case "bg-rose-500":
				return <AlertCircle size="24" />;
			case "bg-brand":
				return <Zap size="24" />;
			default:
				return <HelpCircle size="24" />;
		}
	};

	return (
		<div className={`${description ? "w-full" : "w-fit mx-auto"} max-w-6xl mt-1 p-2 px-4 flex flex-row gap-4 items-center ${theme} rounded-lg text-white`}>
			{renderIconBasedOnTheme(theme)}
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
