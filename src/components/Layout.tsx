import React from "react";
import { Footer } from "./index";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			{children}
			<Footer />
		</>
	);
};

export default Layout;
