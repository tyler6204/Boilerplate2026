import { createContext, useContext } from "react";
import type { ThemeName, ThemeNameWithSystem } from "./theme";

export type ThemeContextValue = {
  /** The user's theme preference (includes "system") */
  theme: ThemeNameWithSystem;
  /** The resolved theme name (never "system", always the actual theme) */
  resolvedTheme: ThemeName;
  /** Set the theme preference */
  setTheme: (theme: ThemeNameWithSystem) => void;
  /** Whether the resolved theme is a dark variant */
  isDark: boolean;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

/**
 * Hook to access the current theme and theme setter.
 *
 * @example
 * const { theme, resolvedTheme, setTheme, isDark } = useTheme();
 *
 * // Check current theme
 * if (isDark) { ... }
 *
 * // Change theme
 * setTheme("christmas");
 * setTheme("system"); // Follow device settings
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
