import { useResolveClassNames } from 'uniwind'

type RGBComponents = { r: number; g: number; b: number };

/**
 * Parse any color format (hex, rgb, rgba) to RGB components
 */
function parseColorToRGB(color: string): RGBComponents | null {
  const trimmed = color.trim();

  // Handle hex format
  if (trimmed.startsWith('#')) {
    const hex = trimmed.slice(1);
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
      };
    } else if (hex.length >= 6) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
      };
    }
  }

  // Handle rgb/rgba format: rgb(255, 255, 255) or rgba(255, 255, 255, 0.5)
  const rgbMatch = trimmed.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    };
  }

  return null;
}

function toHex(components: RGBComponents): string {
  const r = components.r.toString(16).padStart(2, '0');
  const g = components.g.toString(16).padStart(2, '0');
  const b = components.b.toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

function toHexWithAlpha(components: RGBComponents, alpha: number): string {
  const r = components.r.toString(16).padStart(2, '0');
  const g = components.g.toString(16).padStart(2, '0');
  const b = components.b.toString(16).padStart(2, '0');
  // Android expects ARGB format (#AARRGGBB)
  const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return `#${a}${r}${g}${b}`;
}

/**
 * Shade to alpha mapping for Tailwind color shades.
 * We use the -500 base color and apply alpha to simulate lighter shades.
 * Darker shades (600-950) use full opacity since alpha can't darken.
 */
const SHADE_TO_ALPHA: Record<string, number> = {
  '50': 0.1,
  '100': 0.2,
  '200': 0.4,
  '300': 0.6,
  '400': 0.8,
  '500': 1,
  '600': 1,
  '700': 1,
  '800': 1,
  '900': 1,
  '950': 1,
};

/**
 * Parse a Tailwind color like "blue-300" into base color and shade.
 * Returns null if it's not a standard shade pattern.
 */
function parseColorShade(color: string): { baseColor: string; shade: string } | null {
  const match = color.match(/^(.+)-(\d{2,3})$/);
  if (match && SHADE_TO_ALPHA[match[2]]) {
    return { baseColor: match[1], shade: match[2] };
  }
  return null;
}

/**
 * Hook that converts a given Tailwind color name to its corresponding hex color value, supporting an alpha value.
 *
 * @param tailwindColor - The Tailwind color name (e.g., 'blue-500', 'blue-100', 'background', etc.).
 * @param alpha - A number between 0 and 1 specifying the desired opacity (defaults to 1).
 * @returns The resolved hex color string if available, otherwise undefined.
 */
export function useTailwindToHex(tailwindColor: string | undefined, alpha: number = 1): string | undefined {
  // Check if this is a shade variant (e.g., blue-300) that needs conversion
  const shadeInfo = tailwindColor ? parseColorShade(tailwindColor) : null;
  const colorToResolve = shadeInfo ? `${shadeInfo.baseColor}-500` : tailwindColor;
  const shadeAlpha = shadeInfo ? SHADE_TO_ALPHA[shadeInfo.shade] : 1;

  const className = `text-${colorToResolve} bg-${colorToResolve}`;
  const resolvedClassNames = useResolveClassNames(className);

  const baseColor = resolvedClassNames?.color?.toString() ?? resolvedClassNames?.backgroundColor?.toString();

  if (!baseColor) {
    return undefined;
  }

  const components = parseColorToRGB(baseColor);
  if (!components) {
    return undefined;
  }

  // Combine shade alpha with user-provided alpha
  const combinedAlpha = Math.max(0, Math.min(1, alpha * shadeAlpha));

  if (combinedAlpha === 1) {
    return toHex(components);
  }

  return toHexWithAlpha(components, combinedAlpha);
}
