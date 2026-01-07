type ColorDefinition = {
  light: string;
  dark: string;
  christmas: string;
} & Record<string, string>;

/**
 * Available theme names
 * "system" follows device settings for light/dark
 */
export const THEME_NAMES = ["light", "dark", "christmas"] as const;
export type ThemeName = (typeof THEME_NAMES)[number];
export type ThemeNameWithSystem = ThemeName | "system";

/**
 * Theme color tokens with light, dark, and custom theme values
 * Update this object when adding new colors to theme.css
 * To add a new theme: add values here AND add CSS class in theme.css
 */
export const theme = {
  brand: {
    light: "oklch(0.55 0.2 260)",
    dark: "oklch(0.65 0.2 260)",
    christmas: "oklch(0.5 0.22 25)", // Christmas red
  },
  background: {
    light: "oklch(1 0 0)",
    dark: "oklch(0.145 0 0)",
    christmas: "oklch(0.15 0.04 145)", // Deep forest green
  },
  "background-secondary": {
    light: "oklch(0.97 0 0)",
    dark: "oklch(0.269 0 0)",
    christmas: "oklch(0.2 0.05 145)", // Slightly lighter green
  },
  foreground: {
    light: "oklch(0.145 0 0)",
    dark: "oklch(0.985 0 0)",
    christmas: "oklch(0.95 0.02 90)", // Warm cream white
  },
  "foreground-secondary": {
    light: "oklch(0.556 0 0)",
    dark: "oklch(0.708 0 0)",
    christmas: "oklch(0.8 0.03 90)", // Soft cream
  },
  placeholder: {
    light: "oklch(0.5 0 0)",
    dark: "oklch(0.65 0 0)",
    christmas: "oklch(0.6 0.04 145)", // Muted green
  },
  destructive: {
    light: "oklch(0.577 0.245 27.325)",
    dark: "oklch(0.704 0.191 22.216)",
    christmas: "oklch(0.55 0.25 25)", // Deep red
  },
  success: {
    light: "oklch(0.7 0.17 148)",
    dark: "oklch(0.69 0.19 152)",
    christmas: "oklch(0.55 0.18 145)", // Forest green
  },
  warning: {
    light: "oklch(0.6671 0.1685 53.38)",
    dark: "oklch(0.8 0.16 85)",
    christmas: "oklch(0.75 0.15 85)", // Gold
  },
  border: {
    light: "oklch(0.92 0 0)",
    dark: "oklch(0.45 0 0)",
    christmas: "oklch(0.35 0.08 145)", // Dark green border
  },
  tabSelected: {
    light: "oklch(0.85 0 0)",
    dark: "oklch(0.4 0 0)",
    christmas: "oklch(0.3 0.06 145)", // Selected tab green
  },
  ring: {
    light: "oklch(0.55 0.2 260)",
    dark: "oklch(0.65 0.2 260)",
    christmas: "oklch(0.7 0.15 85)", // Gold ring
  },
} as const satisfies Record<string, ColorDefinition>;

export type ThemeColorKey = keyof typeof theme;

/**
 * Get a theme color value, falling back to "light" if the theme doesn't exist
 */
export function getThemeColor(
  colorKey: ThemeColorKey,
  themeKey: string
): string {
  const color = theme[colorKey];
  return color[themeKey as keyof typeof color] ?? color.light;
}
