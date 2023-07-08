import React from "react";
import { Footer } from "./index";
import { useUserData } from "../hooks";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const { user } = useUserData();
	return (
		<>
			{!user ?
				<>
					{children}
					<Footer />
				</>
				:
				<div className="border-2 border-brand rounded-md">
					<span className="absolute top-0 right-0 z-10 p-0.5 px-3 bg-brand text-black font-medium rounded-bl-md rounded-tr-lg">Editor</span>
					{children}
					<Footer />
				</div>
			}
		</>
	);
};

export default Layout;
