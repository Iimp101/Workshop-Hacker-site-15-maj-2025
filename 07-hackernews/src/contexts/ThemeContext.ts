import { createContext } from "react";

interface ThemeContextType {
	isDarkMode: boolean;
	toggleTheme: () => void;
}

// This creates the actual context and sets the context's default/initial value
export const ThemeContext = createContext<ThemeContextType | null>(null);
