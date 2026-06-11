import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#40DDCB',
          dark: '#2BB8A8',
          light: '#E8FAF8',
        },
        dark: '#1A1A2E',
        text: '#2D2D2D',
        muted: '#6B7280',
        'off-white': '#F8F9FA',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        card: '0 4px 24px -6px rgba(26, 26, 46, 0.08)',
        'card-hover': '0 16px 40px -8px rgba(26, 26, 46, 0.16)',
      },
    },
  },
  plugins: [],
} satisfies Config
