/** CMS content is sometimes ALL CAPS — normalize to sentence case for display. */
export function sentenceCase(text: string): string {
  const trimmed = text.trim()
  if (trimmed && trimmed === trimmed.toUpperCase()) {
    const lower = trimmed.toLowerCase()
    return lower.charAt(0).toUpperCase() + lower.slice(1)
  }
  return trimmed
}
