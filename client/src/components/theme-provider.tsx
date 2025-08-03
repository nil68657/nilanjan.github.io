import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeProviderContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove previous theme class
    root.classList.remove("light", "dark");
    
    // Add current theme class
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem("theme", theme);
    
    // Update CSS custom properties for theme
    if (theme === "light") {
      root.style.setProperty("--background", "hsl(0, 0%, 100%)");
      root.style.setProperty("--foreground", "hsl(0, 0%, 0%)");
      root.style.setProperty("--muted", "hsl(210, 40%, 94%)");
      root.style.setProperty("--muted-foreground", "hsl(215.4, 16.3%, 46.9%)");
      root.style.setProperty("--card", "hsl(0, 0%, 100%)");
      root.style.setProperty("--card-foreground", "hsl(0, 0%, 0%)");
      root.style.setProperty("--border", "hsl(214.3, 31.8%, 91.4%)");
    } else {
      root.style.setProperty("--background", "hsl(0, 0%, 0%)");
      root.style.setProperty("--foreground", "hsl(0, 0%, 100%)");
      root.style.setProperty("--muted", "hsl(240, 3.7%, 15.9%)");
      root.style.setProperty("--muted-foreground", "hsl(240, 5%, 64.9%)");
      root.style.setProperty("--card", "hsl(240, 10%, 3.9%)");
      root.style.setProperty("--card-foreground", "hsl(0, 0%, 98%)");
      root.style.setProperty("--border", "hsl(240, 3.7%, 15.9%)");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};