import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import ThemeContextProvider from "./contexts/ThemeContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
			<BrowserRouter>
				<ThemeContextProvider>
					<App />
				</ThemeContextProvider>
			</BrowserRouter>
	</StrictMode>
);
