import { ReactNode } from "react";
import { Footer } from "./index";
import { useAuth } from "../hooks";
import { Dna } from "lucide-react";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const { user } = useAuth();
	return (
		<>
			{user &&
				<div className="fixed w-fit z-10 top-2 right-1">
					<div className="py-1 px-3 flex flex-row gap-2 items-center bg-brand rounded-full drop-shadow">
						<Dna className="w-4 h-auto stroke-black" />
						<span className="text-black text-sm">Editor</span>
					</div>
				</div>
			}
			{children}
			<Footer />
		</>
	);
};

export default Layout;
