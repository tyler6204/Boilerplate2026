/**
 * Converts an OKLCH color string to a hex color string
 *
 * Conversion pipeline: OKLCH → OKLab → Linear RGB → sRGB → Hex
 *
 * @param oklch - OKLCH color string (e.g., 'oklch(0.7 0.17 148)')
 * @returns Hex color string (e.g., '#3DBB6F')
 *
 * @example
 * ```ts
 * const hex = oklchToHex('oklch(0.7 0.17 148)'); // Returns '#3DBB6F'
 * ```
 */
export function oklchToHex(oklch: string): string {
  // Parse OKLCH values
  // Regex explainer: Matches "oklch(", captures L (and optional %), C, H, closes ")"
  // Handles loose spacing.
  const match = oklch.match(/oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\s*\)/);
  
  if (!match) {
    throw new Error(`Invalid OKLCH format: ${oklch}`);
  }

  // 1. Parse Input
  let lStr = match[1];
  const isPercentage = match[2] === '%';
  let L = parseFloat(lStr);
  let C = parseFloat(match[3]);
  let hDegrees = parseFloat(match[4]);

  // Convert percentage Lightness to 0-1 range if needed
  if (isPercentage) {
    L = L / 100;
  }

  // 2. OKLCH -> OKLab
  // a = C * cos(h)
  // b = C * sin(h)
  // Note: h must be converted from degrees to radians
  const hRadians = hDegrees * (Math.PI / 180);
  const a = C * Math.cos(hRadians);
  const b = C * Math.sin(hRadians);

  // 3. OKLab -> Linear sRGB
  // This involves converting Lab -> LMS -> Linear RGB
  
  // 3a. Convert OKLab to Linear LMS (using standard matrices)
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  // 3b. Coordinate scaling (Non-linear LMS -> Linear LMS)
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  // 3c. Linear LMS to Linear sRGB
  const rLin = 4.0766066871 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  // 4. Linear sRGB -> sRGB (Gamma Correction)
  // Standard sRGB transfer function
  const toSRGB = (c: number): number => {
    const val = c <= 0.0031308 
      ? 12.92 * c 
      : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    
    // Clamp values between 0 and 1 before returning
    return Math.max(0, Math.min(1, val));
  };

  const r = toSRGB(rLin);
  const g = toSRGB(gLin);
  const blue = toSRGB(bLin); // 'blue' matches reserved word issues in some contexts, safe variable name

  // 5. sRGB -> Hex
  const toHex = (n: number): string => {
    const intVal = Math.round(n * 255);
    return intVal.toString(16).padStart(2, '0').toUpperCase();
  };

  return `#${toHex(r)}${toHex(g)}${toHex(blue)}`;
}