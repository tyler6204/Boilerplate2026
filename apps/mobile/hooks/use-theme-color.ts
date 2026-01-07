/**
 * Hook to get a theme color value based on the current theme.
 * Supports custom themes (light, dark, christmas, etc.)
 */

import { useTheme } from "@/components/theme-provider";
import { theme, oklchToHex, type ThemeColorKey, type ThemeName } from "@repo/theme";

type ThemeColorProps = Partial<Record<ThemeName, string>>;

export function useThemeColor(
  props: ThemeColorProps,
  colorName: ThemeColorKey
): string {
  const { resolvedTheme } = useTheme();
  const colorFromProps = props[resolvedTheme];

  let color: string;
  if (colorFromProps) {
    color = colorFromProps;
  } else {
    // Get color from theme, fallback to light if theme key doesn't exist
    color = theme[colorName][resolvedTheme] ?? theme[colorName].light;
  }

  // Automatically convert OKLCH to hex if needed
  if (color.startsWith("oklch(")) {
    return oklchToHex(color);
  }

  return color;
}
