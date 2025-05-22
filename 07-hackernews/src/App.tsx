import clsx from "clsx";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";
import "./assets/scss/App.scss";
import useTheme from "./hooks/useTheme";
import RandomDogPage from "./pages/RandomDogPage";

function App() {
	const { isDarkMode } = useTheme();

	const appCssClasses = clsx({
		"bg-white": !isDarkMode,
		"text-dark": !isDarkMode,
	});

	return (
		<div id="App" className={appCssClasses}>
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/search" element={<SearchPage />} />
					<Route path="random-dog" element={<RandomDogPage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App;
