import type { ContactFormData, StrapiImage, StrapiListResponse } from '../types'

export const STRAPI_URL: string =
  import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

/**
 * Media on the production Strapi is stored in Cloudflare R2; the API returns
 * private-bucket URLs that must be rewritten to the public r2.dev host.
 * Same mapping as in the original frontend/lib/strapi.ts.
 */
const R2_PRIVATE =
  'https://ae0e5ad00759ea5f03237821fe4e6ca9.r2.cloudflarestorage.com/fwip-sk-media'
const R2_PUBLIC = 'https://pub-7d6fe2e7774e4986929a98b942945494.r2.dev'

export function toAbsoluteUrl(url: string | null | undefined): string {
  if (!url) return ''
  if (url.startsWith(R2_PRIVATE)) return url.replace(R2_PRIVATE, R2_PUBLIC)
  if (url.startsWith('http')) return url
  return `${STRAPI_URL}${url}`
}

/** Recursively rewrite every `url` field in a Strapi payload to an absolute URL. */
export function fixUrls<T>(obj: T): T {
  if (!obj || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(fixUrls) as T

  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    result[key] =
      key === 'url' && typeof value === 'string' ? toAbsoluteUrl(value) : fixUrls(value)
  }
  return result as T
}

/** Best available image URL for a Strapi media object, preferring large format. */
export function imageUrl(image: StrapiImage | null | undefined): string {
  if (!image) return ''
  const raw =
    image.formats?.large?.url ||
    image.formats?.medium?.url ||
    image.formats?.small?.url ||
    image.url ||
    ''
  return toAbsoluteUrl(raw)
}

/**
 * Generic Strapi REST GET. `path` starts with /api/… and includes any
 * populate query params (same patterns as the original frontend).
 */
export async function strapiGet<T>(path: string): Promise<StrapiListResponse<T>> {
  const res = await fetch(`${STRAPI_URL}${path}`)
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${path}`)
  const json = (await res.json()) as StrapiListResponse<T>
  return { ...json, data: fixUrls(json.data) }
}

/** POST to the contact-formulars collection (field names match the schema). */
export async function submitContactForm(
  data: ContactFormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/contact-formulars`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    })
    if (res.ok) return { success: true }
    const errorData = await res.json().catch(() => null)
    return {
      success: false,
      error: errorData?.error?.message || 'Správu sa nepodarilo odoslať',
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Neznáma chyba',
    }
  }
}
