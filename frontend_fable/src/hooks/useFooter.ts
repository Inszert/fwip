import type { StrapiFooter } from '../types'
import { useStrapi } from './useStrapi'

/** Footer contact + link slots from Strapi. Null → static FOOTER copy. */
export function useFooter() {
  return useStrapi<StrapiFooter, StrapiFooter | null>(
    '/api/footers?populate[footer_opt]=*&populate[footer_btns]=*',
    (items) => items[0] ?? null,
    null,
  )
}
