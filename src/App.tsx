import React from "react";
import { Route, Routes } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import Home from "./pages/Home.js";
import Terms from "./pages/Terms.js";
import Privacy from "./pages/Privacy.js";

const App = () => {
	return (
		<ParallaxProvider>
			<Routes>
				<Route path="*" element={<Home />} />
				<Route path="/terms" element={<Terms />} />
				<Route path="/privacy" element={<Privacy />} />
			</Routes>
		</ParallaxProvider>
	);
};

export default App;
