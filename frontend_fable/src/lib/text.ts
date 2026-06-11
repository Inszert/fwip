/** Named CSS colors that appear in the CMS data, mapped to hex. */
const NAMED_COLORS: Record<string, string> = {
  orange: '#FFA500',
  brown: '#A52A2A',
  yellow: '#FFFF00',
  pink: '#FFC0CB',
  beige: '#F5F5DC',
  white: '#FFFFFF',
  black: '#000000',
}

/** Perceived luminance check for CMS colors — picks readable text color. */
export function isLightColor(color: string): boolean {
  const normalized = NAMED_COLORS[color.trim().toLowerCase()] || color.trim()
  const hex = normalized.match(/^#([0-9a-fA-F]{6})$/)?.[1]
  if (!hex) return false
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 170
}

/** CMS content is sometimes ALL CAPS — normalize to sentence case for display. */
export function sentenceCase(text: string): string {
  const trimmed = text.trim()
  if (trimmed && trimmed === trimmed.toUpperCase()) {
    const lower = trimmed.toLowerCase()
    return lower.charAt(0).toUpperCase() + lower.slice(1)
  }
  return trimmed
}
