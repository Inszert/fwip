/**
 * Design tokens as TS constants.
 * Single source of truth mirrored in tailwind.config.ts —
 * use Tailwind classes in components; use these constants only
 * where a literal value is required (canvas, meta tags, SVG fills).
 */
export const colors = {
  primary: '#40DDCB',
  primaryDark: '#2BB8A8',
  primaryLight: '#E8FAF8',
  dark: '#1A1A2E',
  text: '#2D2D2D',
  muted: '#6B7280',
  white: '#FFFFFF',
  offWhite: '#F8F9FA',
} as const

export const fonts = {
  display: '"Playfair Display", serif',
  sans: 'Inter, system-ui, sans-serif',
  accent: '"Cormorant Garamond", serif',
} as const

export const layout = {
  /** Standard horizontal page container */
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  /** Standard vertical section rhythm */
  section: 'py-20 md:py-28',
} as const
