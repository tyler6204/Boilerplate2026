"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import {
  ThemeContext,
  type ThemeContextValue,
  type ThemeName,
  type ThemeNameWithSystem,
  THEME_NAMES,
} from "@repo/theme";

const THEME_STORAGE_KEY = "theme_preference";

type ThemeProviderProps = {
  children: ReactNode;
  /** Default theme if no preference is stored */
  defaultTheme?: ThemeNameWithSystem;
  /** Storage key for persisting theme preference */
  storageKey?: string;
};

/**
 * Theme provider for Next.js/React web apps.
 * Manages theme state, persists preferences to localStorage,
 * and applies the appropriate theme class to the document.
 *
 * @example
 * <ThemeProvider defaultTheme="system">
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeNameWithSystem>(() => {
    // SSR: return default theme
    if (typeof window === "undefined") return defaultTheme;

    // Client: try to get stored preference
    const stored = localStorage.getItem(storageKey);
    if (stored && isValidTheme(stored)) {
      return stored as ThemeNameWithSystem;
    }
    return defaultTheme;
  });

  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Resolve "system" to actual theme based on device settings
  const resolvedTheme: ThemeName =
    theme === "system" ? systemTheme : theme;

  const isDark = resolvedTheme === "dark";

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;

    // Remove all theme classes
    THEME_NAMES.forEach((t) => {
      if (t !== "light") {
        root.classList.remove(t);
      }
    });

    // Add current theme class (light is default, no class needed)
    if (resolvedTheme !== "light") {
      root.classList.add(resolvedTheme);
    }
  }, [resolvedTheme]);

  // Save theme preference when it changes
  const setTheme = useCallback(
    (newTheme: ThemeNameWithSystem) => {
      setThemeState(newTheme);
      localStorage.setItem(storageKey, newTheme);
    },
    [storageKey]
  );

  const contextValue: ThemeContextValue = {
    theme,
    resolvedTheme,
    setTheme,
    isDark,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

function isValidTheme(value: string): value is ThemeNameWithSystem {
  return value === "system" || THEME_NAMES.includes(value as ThemeName);
}
