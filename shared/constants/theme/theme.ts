type ColorDefinition = {
  light: string;
  dark: string;
} & Record<string, string>;

/**
 * Theme color tokens with light and dark mode values
 * Update this object when adding new colors to theme.css
 * You can add additional themes (e.g., "xmas") to any color definition
 */
export const theme = {
  brand: {
    light: "oklch(0.1 0 0)",
    dark: "oklch(1 0 0)",
  },
  background: {
    light: "oklch(1 0 0)",
    dark: "oklch(0.145 0 0)",
  },
  "background-secondary": {
    light: "oklch(0.97 0 0)",
    dark: "oklch(0.269 0 0)",
  },
  foreground: {
    light: "oklch(0.145 0 0)",
    dark: "oklch(0.985 0 0)",
  },
  "foreground-secondary": {
    light: "oklch(0.556 0 0)",
    dark: "oklch(0.708 0 0)",
  },
  placeholder: {
    light: "oklch(0.5 0 0)",
    dark: "oklch(0.65 0 0)",
  },
  destructive: {
    light: "oklch(0.577 0.245 27.325)",
    dark: "oklch(0.704 0.191 22.216)",
  },
  success: {
    light: "oklch(0.7 0.17 148)",
    dark: "oklch(0.69 0.19 152)",
  },
  warning: {
    light: "oklch(0.6671 0.1685 53.38)",
    dark: "oklch(0.8 0.16 85)",
  },
  border: {
    light: "oklch(0.8 0 0)",
    dark: "oklch(0.45 0 0)",
  },
  tabSelected: {
    light: "oklch(0.85 0 0)",
    dark: "oklch(0.4 0 0)",
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
  return color[themeKey] ?? color.light;
}
