import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ClerkProvider>
);
