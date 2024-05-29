import React from "react";
import { Route, Routes } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { Home, Terms, Privacy, Specs } from "./pages";
import { ToastProvider } from "@chakra-ui/toast";

const App = () => {
	return (
		<ParallaxProvider>
			<ToastProvider />
			<Routes>
				<Route path="*" element={<Home />} />
				<Route path="/terms" element={<Terms />} />
				<Route path="/privacy" element={<Privacy />} />
				<Route path="/specs" element={<Specs />} />
			</Routes>
		</ParallaxProvider>
	);
};

export default App;
