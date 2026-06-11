import type { StrapiHeader } from '../types'
import { useStrapi } from './useStrapi'

/** Header content (fwip logo image) from the headers collection. */
export function useHeader() {
  return useStrapi<StrapiHeader, StrapiHeader | null>(
    '/api/headers?populate=*',
    (items) => items[0] ?? null,
    null,
  )
}
