/**
 * SwiftUI Text Style Font Sizes (in points)
 * Default point sizes at default Dynamic Type
 */
const swiftUITextSizes = {
  "large-title": 34,
  title: 28,
  title2: 22,
  title3: 20,
  headline: 17,
  body: 17,
  callout: 16,
  subheadline: 15,
  footnote: 13,
  caption: 12,
  caption1: 12,
  caption2: 11,
} as const;

export type SwiftUITextStyle = keyof typeof swiftUITextSizes;

type ParseFontSizeResult = {
  fontSize: number | null;
  processedClassName: string;
};

/**
 * Parses a className string for SwiftUI font size patterns (e.g., "font-body", "font-headline")
 * and resolves them to pixel values.
 *
 * @param className - The className string to parse
 * @returns An object with the resolved font size (or null if not found) and the processed className
 *
 * @example
 * ```ts
 * const result = parseFontSizeFromClassName('font-body text-lg');
 * // result.fontSize = 17
 * // result.processedClassName = 'text-lg'
 * ```
 */
export function parseFontSizeFromClassName(
  className: string | undefined
): ParseFontSizeResult {
  if (!className) {
    return { fontSize: null, processedClassName: "" };
  }

  // Find all font-{sizeName} or text-{sizeName} patterns (e.g., "font-body", "text-headline")
  // We need to check all matches because font-mono or other font- classes might come before font-size classes
  const fontRegex = /font-(\w+(?:-\w+)?)/g;
  const textRegex = /text-(\w+(?:-\w+)?)/g;
  
  // Check font- matches first, then text- matches
  let validMatch: { sizeName: string; prefix: string; fullMatch: string } | null = null;
  
  // Check font- prefixed classes
  let match;
  while ((match = fontRegex.exec(className)) !== null) {
    const sizeName = match[1] as SwiftUITextStyle;
    if (sizeName in swiftUITextSizes) {
      validMatch = {
        sizeName,
        prefix: "font-",
        fullMatch: match[0],
      };
      break;
    }
  }
  
  // If no valid font- match found, check text- prefixed classes
  if (!validMatch) {
    while ((match = textRegex.exec(className)) !== null) {
      const sizeName = match[1] as SwiftUITextStyle;
      if (sizeName in swiftUITextSizes) {
        validMatch = {
          sizeName,
          prefix: "text-",
          fullMatch: match[0],
        };
        break;
      }
    }
  }

  if (!validMatch) {
    return { fontSize: null, processedClassName: className };
  }

  const fontSize = swiftUITextSizes[validMatch.sizeName as SwiftUITextStyle];

  // Remove only the specific font-size class (not all font- classes)
  // Use word boundaries to ensure we match the full class name
  const escapedMatch = validMatch.fullMatch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const processedClassName = className
    .replace(new RegExp(`\\b${escapedMatch}\\b`, "g"), "")
    .replace(/\s+/g, " ")
    .trim();

  return {
    fontSize,
    processedClassName,
  };
}
