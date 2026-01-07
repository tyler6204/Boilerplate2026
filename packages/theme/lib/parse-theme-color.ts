import { theme, type ThemeColorKey } from "../theme";
import { hexWithAlpha } from "./colors";
import { oklchToHex } from "./oklch-convert";

type ParseThemeColorResult = {
  color: string | null;
  processedClassName: string;
};

/**
 * Color prefixes that should be parsed for theme colors
 * These are Tailwind utility classes that accept color values
 */
const COLOR_PREFIXES = [
  "bg",
  "border",
  "ring",
  "text",
  "outline",
  "divide",
  "from",
  "via",
  "to",
  "accent",
  "caret",
  "decoration",
  "fill",
  "stroke",
  "shadow",
];

/**
 * Parses a className string for theme color patterns (e.g., "text-success", "bg-brand", "border-destructive")
 * and resolves them to hex color values from the theme, replacing them with Tailwind arbitrary value syntax.
 * Supports opacity values like "/60" which will be applied to the resolved color.
 *
 * @param className - The className string to parse
 * @param mode - The theme mode ('light' | 'dark')
 * @returns An object with the resolved text color (or null if not found) and the processed className
 *
 * @example
 * ```ts
 * const result = parseThemeColorFromClassName('text-success bg-brand/60 border-destructive', 'light');
 * // result.color = '#3DBB6F' (or the hex value for success in light mode)
 * // result.processedClassName = 'text-[#3DBB6F] bg-[#hexWithAlpha] border-[#hex]'
 * ```
 */
export function parseThemeColorFromClassName(
  className: string | undefined,
  mode: string
): ParseThemeColorResult {
  if (!className) {
    return { color: null, processedClassName: "" };
  }

  let processedClassName = className;
  let textColor: string | null = null;

  // Collect all matches first to avoid issues with modifying the string during iteration
  const matches: Array<{
    prefix: string;
    fullMatch: string;
    colorName: string;
    opacity: number | null;
    startIndex: number;
  }> = [];

  // Find all color class matches
  for (const prefix of COLOR_PREFIXES) {
    // Match pattern: prefix-colorName or prefix-colorName/opacity (e.g., "bg-brand", "bg-brand/60")
    // The regex matches: prefix- followed by word characters (including hyphens for multi-word colors)
    // Optionally followed by /opacity where opacity is a number
    const regex = new RegExp(
      `(^|\\s)${prefix}-([\\w-]+)(?:\\/(\\d+))?(?=\\s|$)`,
      "g"
    );
    let match;

    while ((match = regex.exec(className)) !== null) {
      const fullMatch = match[0].trim();
      const colorName = match[2] as ThemeColorKey;
      const opacityMatch = match[3];

      // Check if the color exists in the theme
      if (colorName in theme) {
        const opacity = opacityMatch ? parseInt(opacityMatch, 10) : null;
        matches.push({
          prefix,
          fullMatch,
          colorName,
          opacity,
          startIndex: match.index,
        });
      }
    }
  }

  // Sort matches by start index in reverse order to replace from end to start
  // This prevents index shifting issues when replacing
  matches.sort((a, b) => b.startIndex - a.startIndex);

  // Process matches and replace in the className
  for (const match of matches) {
    const { prefix, fullMatch, colorName, opacity } = match;
    const themeColor = (theme[colorName] as any)[mode];
    let resolvedColor: string;

    // Convert oklch to hex if needed
    if (themeColor.startsWith("oklch(")) {
      resolvedColor = oklchToHex(themeColor);
    } else {
      resolvedColor = themeColor;
    }

    // Apply opacity if specified (convert percentage to 0-1 range)
    if (opacity !== null) {
      const alphaValue = opacity / 100;
      resolvedColor = hexWithAlpha(resolvedColor, alphaValue);
    }

    // Replace the class with arbitrary value syntax (e.g., "bg-brand" -> "bg-[#hex]", "bg-brand/60" -> "bg-[#hexWithAlpha]")
    // Use word boundaries to ensure we replace the exact match
    const escapedMatch = fullMatch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    processedClassName = processedClassName.replace(
      new RegExp(`(^|\\s)${escapedMatch}(?=\\s|$)`, "g"),
      `$1${prefix}-[${resolvedColor}]`
    );

    // If this is a text- color, store it for the textColor return value
    if (prefix === "text") {
      textColor = resolvedColor;
    }
  }

  return {
    color: textColor,
    processedClassName: processedClassName.trim(),
  };
}
