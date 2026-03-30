"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";
type Mode = "human" | "machine";

interface ThemeContextValue {
  theme: Theme;
  mode: Mode;
  toggleTheme: () => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mode, setMode] = useState<Mode>("human");
  const [mounted, setMounted] = useState(false);

  // On mount: read saved preferences or fall back to system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const savedMode = localStorage.getItem("mode") as Mode | null;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }

    if (savedMode) {
      setMode(savedMode);
    }

    setMounted(true);
  }, []);

  // Sync classes on <html> whenever theme or mode changes
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Theme: add or remove .dark
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Mode: add or remove .machine
    if (mode === "machine") {
      root.classList.add("machine");
    } else {
      root.classList.remove("machine");
    }

    // Persist to localStorage
    localStorage.setItem("theme", theme);
    localStorage.setItem("mode", mode);
  }, [theme, mode, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "human" ? "machine" : "human"));
  }, []);

  // Don't render until client-side state is resolved
  // The blocking script in <head> handles the visual — this prevents hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook — any component can call useTheme() to get the current state + toggles
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
