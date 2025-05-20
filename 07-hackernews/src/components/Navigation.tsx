import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContextProvider";

const Navigation = () => {
	const themeContext = useContext(ThemeContext);
	if (!themeContext) {
		throw new Error("Trying to use ThemeContext outside of its provider");
	}
	const { isDarkMode ,toggleTheme } = themeContext;

	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">🕵🏻‍♂️ Hacker News</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} end to="/search">Search</Nav.Link>
					</Nav>
						<Button onClick={toggleTheme} variant="outline-secondary">
							{isDarkMode ? "Dark 🌑" : "Light ☀️"}
						</Button>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation;
