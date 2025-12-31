/**
 * Adds alpha channel to a hex color
 * @param hex - Hex color string (e.g., '#FF0000' or 'FF0000')
 * @param alpha - Alpha value between 0 and 1
 * @returns Hex color string with alpha (e.g., '#FF000033' for 0.2 opacity)
 */
export function hexWithAlpha(hex: string, alpha: number = 1): string {
  // Remove # if present
  const cleanHex = hex.replace('#', '');
  
  // Convert alpha (0-1) to hex (00-FF)
  const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0').toUpperCase();
  
  return `#${cleanHex}${alphaHex}`;
}
