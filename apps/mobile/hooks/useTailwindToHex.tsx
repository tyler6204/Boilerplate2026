import { useResolveClassNames } from 'uniwind'

/**
 * Hook that converts a given Tailwind color name to its corresponding hex color value, supporting an alpha value.
 *
 * @param tailwindColor - The Tailwind color name (e.g., 'blue-500', 'background', etc.).
 * @param alpha - A number between 0 and 1 specifying the desired opacity (defaults to 1).
 * @returns The resolved hex color string if available, otherwise '#FF0000'.
 *
 * This hook uses the `useResolveClassNames` hook from uniwind to resolve Tailwind color class names
 * to their computed style, then extracts the backgroundColor property and returns it as a string.
 * The alpha value is mapped to Tailwind's opacity modifiers, e.g., bg-red-500/20 for 0.2.
 */
export function useTailwindToHex(tailwindColor: string | undefined, alpha: number = 1): string | undefined {
  const alphaPercent = Math.round(alpha * 100);
  // Clamp between 0 and 100 just in case
  const safeAlphaPercent = Math.max(0, Math.min(100, alphaPercent));
  // When alpha is 100, don't add /100 - just use base class
  const className = safeAlphaPercent === 100
    ? `bg-${tailwindColor}`
    : `bg-${tailwindColor}/${safeAlphaPercent}`;
  const resolvedClassNames = useResolveClassNames(className);

  return resolvedClassNames?.backgroundColor?.toString() ?? undefined;
}
