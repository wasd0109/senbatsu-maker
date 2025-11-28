/**
 * Calculates the resulting color when a hex color is displayed with a given opacity
 * over a white background (#ffffff).
 *
 * @param hexColor - The input color in hex format (e.g., "#ffffff" or "ffffff")
 * @param opacity - The opacity value from 0 to 1 (0 = fully transparent, 1 = fully opaque)
 * @returns The resulting hex color after applying opacity over white background
 *
 * @example
 * calculateColorWithAlpha("#000000", 0.5) // Returns "#808080" (50% black over white)
 * calculateColorWithAlpha("#ff0000", 0.3) // Returns "#ffcccc" (30% red over white)
 */
export function calculateColorWithAlpha(hexColor: string, opacity: number): string {
  // Remove # if present
  const hex = hexColor.replace('#', '');

  // Validate hex color format
  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
    throw new Error('Invalid hex color format. Expected format: #RRGGBB or RRGGBB');
  }

  // Validate opacity range
  if (opacity < 0 || opacity > 1) {
    throw new Error('Opacity must be between 0 and 1');
  }

  // Parse RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate resulting color when displayed over white background (255, 255, 255)
  // Formula: resultColor = (foregroundColor * opacity) + (backgroundColor * (1 - opacity))
  const resultR = Math.round(r * opacity + 255 * (1 - opacity));
  const resultG = Math.round(g * opacity + 255 * (1 - opacity));
  const resultB = Math.round(b * opacity + 255 * (1 - opacity));

  // Convert back to hex
  const toHex = (value: number) => value.toString(16).padStart(2, '0');

  return `#${toHex(resultR)}${toHex(resultG)}${toHex(resultB)}`;
}
