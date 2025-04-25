"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState, createContext, useContext } from "react";

const ThemeProviderContext = createContext();

export function ThemeProvider({ children, defaultTheme = "system", ...props }) {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme) => {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    },
  };

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      {...props}
    >
      <ThemeProviderContext.Provider value={value}>
        {children}
      </ThemeProviderContext.Provider>
    </NextThemesProvider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
