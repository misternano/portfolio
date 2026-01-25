import React from "react";
import { Route, Routes } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { Home, Terms, Privacy, Specs, Blank, Status } from "./pages";
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
				<Route path="/blank" element={<Blank />} />
				<Route path="/status" element={<Status />} />
			</Routes>
		</ParallaxProvider>
	);
};

export default App;
