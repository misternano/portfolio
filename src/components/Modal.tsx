import { ReactNode, RefObject } from "react";
import { X } from "lucide-react";

interface ModalProps {
	title: string,
	ref: RefObject<HTMLDivElement> | null,
	children: ReactNode,
	closeRef: () => void
}

const Modal = ({ title, ref, children, closeRef }: ModalProps) => {
	return (
		<div ref={ref} className="min-w-[20rem] p-4 flex flex-col gap-4 bg-neutral-900 border border-neutral-700 rounded-xl">
			<div className="flex flex-row justify-between items-center">
				<p className="font-medium text-sm text-neutral-300">{title}</p>
				<button onClick={closeRef} className="group border border-transparent hover:border-red-500 rounded-md p-0.5">
					<X size="16" className="group-hover:stroke-red-500" />
				</button>
			</div>
			{children}
		</div>
	);
};

export default Modal;
