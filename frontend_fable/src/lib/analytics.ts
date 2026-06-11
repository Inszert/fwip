/**
 * Google Analytics 4 — loaded ONLY after the user accepts cookies
 * (GDPR-friendly: no tracking before consent, IP anonymized).
 * Set VITE_GA_MEASUREMENT_ID in .env (G-XXXXXXXXXX) to activate.
 */

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export const GA_ID: string = import.meta.env.VITE_GA_MEASUREMENT_ID || ''

const CONSENT_KEY = 'simpleCookieConsent'

let initialized = false

export function hasAnalyticsConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted'
  } catch {
    return false
  }
}

/** Inject gtag.js once consent exists. Safe to call repeatedly. */
export function initAnalytics(): void {
  if (initialized || !GA_ID || !hasAnalyticsConsent()) return
  initialized = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { anonymize_ip: true })
}

/** SPA page-view tracking on route change. No-op before init/consent. */
export function trackPageView(path: string): void {
  if (!initialized || !GA_ID || !window.gtag) return
  window.gtag('config', GA_ID, { page_path: path, anonymize_ip: true })
}
