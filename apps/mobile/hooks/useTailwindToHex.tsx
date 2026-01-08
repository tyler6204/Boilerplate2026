import { useResolveClassNames } from 'uniwind'

function parseHexComponents(hex: string): { r: string; g: string; b: string } | null {
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;

  if (cleanHex.length === 3) {
    return {
      r: cleanHex[0] + cleanHex[0],
      g: cleanHex[1] + cleanHex[1],
      b: cleanHex[2] + cleanHex[2],
    };
  } else if (cleanHex.length >= 6) {
    return {
      r: cleanHex.slice(0, 2),
      g: cleanHex.slice(2, 4),
      b: cleanHex.slice(4, 6),
    };
  }
  return null;
}

function toSolidHex(hex: string): string {
  const components = parseHexComponents(hex);
  if (!components) return hex;
  return `#${components.r}${components.g}${components.b}`;
}

function applyAlphaToHex(hex: string, alpha: number): string {
  const components = parseHexComponents(hex);
  if (!components) return hex;

  // Android expects ARGB format (#AARRGGBB), not RGBA (#RRGGBBAA)
  const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return `#${alphaHex}${components.r}${components.g}${components.b}`;
}

/**
 * Hook that converts a given Tailwind color name to its corresponding hex color value, supporting an alpha value.
 *
 * @param tailwindColor - The Tailwind color name (e.g., 'blue-500', 'background', etc.).
 * @param alpha - A number between 0 and 1 specifying the desired opacity (defaults to 1).
 * @returns The resolved hex color string if available, otherwise undefined.
 */
export function useTailwindToHex(tailwindColor: string | undefined, alpha: number = 1): string | undefined {
  const className = `text-${tailwindColor} bg-${tailwindColor}`;
  const resolvedClassNames = useResolveClassNames(className);
  const baseColor = resolvedClassNames?.color?.toString() ?? resolvedClassNames?.backgroundColor?.toString();

  if (!baseColor) {
    return undefined;
  }

  const safeAlpha = Math.max(0, Math.min(1, alpha));

  if (safeAlpha === 1) {
    // Strip any existing alpha from the color to ensure 6-char hex
    return toSolidHex(baseColor);
  }

  return applyAlphaToHex(baseColor, safeAlpha);
}
