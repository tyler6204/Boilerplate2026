/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { theme, oklchToHex } from "@shared/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import type { ThemeColorKey } from "@shared/constants/theme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ThemeColorKey
) {
  const colorScheme = useColorScheme();
  const mode: "light" | "dark" = colorScheme === "dark" ? "dark" : "light";
  const colorFromProps = props[mode];

  let color: string;
  if (colorFromProps) {
    color = colorFromProps;
  } else {
    color = theme[colorName][mode];
  }

  // Automatically convert OKLCH to hex if needed
  if (color.startsWith("oklch(")) {
    return oklchToHex(color);
  }

  return color;
}
