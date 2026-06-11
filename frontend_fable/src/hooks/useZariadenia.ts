import type { StrapiZariadenia } from '../types'
import { useStrapi } from './useStrapi'

/** Equipment page content from the zariadenias collection. Null → static fallback. */
export function useZariadenia() {
  return useStrapi<StrapiZariadenia, StrapiZariadenia | null>(
    '/api/zariadenias?populate[main_image]=true&populate[units_part][populate]=*',
    (items) => items[0] ?? null,
    null,
  )
}
