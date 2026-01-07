import { useState, useEffect, useCallback, useContext, ReactNode } from "react";
import { useColorScheme as useSystemColorScheme, View, Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Uniwind } from "uniwind";
import {
  ThemeContext,
  type ThemeContextValue,
  type ThemeName,
  type ThemeNameWithSystem,
  THEME_NAMES,
} from "@repo/theme";

/**
 * Hook to access the current theme.
 * IMPORTANT: This is defined locally to avoid React instance mismatch
 * issues when importing hooks from shared packages in React Native.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

const THEME_STORAGE_KEY = "@theme_preference";

type ThemeProviderProps = {
  children: ReactNode;
  /** Default theme if no preference is stored */
  defaultTheme?: ThemeNameWithSystem;
};

/**
 * Theme provider for React Native apps.
 * Manages theme state, persists preferences to AsyncStorage,
 * and uses Uniwind's setTheme API for styling.
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const systemColorScheme = useSystemColorScheme();
  const [theme, setThemeState] = useState<ThemeNameWithSystem>(defaultTheme);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved theme preference on mount
  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY)
      .then((stored) => {
        if (stored && isValidTheme(stored)) {
          setThemeState(stored as ThemeNameWithSystem);
        }
      })
      .finally(() => setIsLoaded(true));
  }, []);

  // Resolve "system" to actual theme based on device settings
  const resolvedTheme: ThemeName =
    theme === "system"
      ? systemColorScheme === "dark"
        ? "dark"
        : "light"
      : theme;

  // Apply theme to Uniwind whenever it changes
  useEffect(() => {
    if (isLoaded) {
      // For "system" theme, pass undefined to let Uniwind use system preference
      // For explicit themes, set them directly
      Uniwind.setTheme(theme as any);

      if (theme ==='system') {
        Appearance.setColorScheme('unspecified');
      }else if (theme === 'light') {
        Appearance.setColorScheme('light');
      }else if (theme === 'dark') {
        Appearance.setColorScheme('dark');
      }else{
        Appearance.setColorScheme('dark');
      }
    }
  }, [theme, isLoaded]);

  // Save theme preference when it changes
  const setTheme = useCallback((newTheme: ThemeNameWithSystem) => {
    setThemeState(newTheme);
    AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
  }, []);

  const isDark = resolvedTheme === "dark";

  const contextValue: ThemeContextValue = {
    theme,
    resolvedTheme,
    setTheme,
    isDark,
  };

  // Don't render until we've loaded the saved preference
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <View className="flex-1 bg-background">{children}</View>
    </ThemeContext.Provider>
  );
}

function isValidTheme(value: string): value is ThemeNameWithSystem {
  return value === "system" || THEME_NAMES.includes(value as ThemeName);
}
