import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";

const App = () => {
	return (
		<Routes>
			<Route path="*" element={<Home />} />
			<Route path="/terms" element={<Terms />} />
			<Route path="/privacy" element={<Privacy />} />
		</Routes>
	);
};

export default App;
