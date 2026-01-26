import { ReactNode } from "react";
import { Footer } from "@/components";
import { SignedIn } from "@clerk/clerk-react";
import { Dna } from "lucide-react";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<SignedIn>
				<div className="fixed w-fit z-10 top-2 right-1">
					<div className="py-1 px-3 flex flex-row gap-2 items-center bg-brand rounded-full drop-shadow">
						<Dna size="16" className="stroke-black" />
						<span className="text-black text-sm">Editor</span>
					</div>
				</div>
			</SignedIn>
			{children}
			<Footer />
		</>
	);
};

export default Layout;
