import type { StrapiPortobello } from '../types'
import { useStrapi } from './useStrapi'

/**
 * Portobello page content: primary hero, secondary feature showcase and
 * "how we do it" options — all components of the portobellos collection.
 */
export function usePortobello() {
  return useStrapi<StrapiPortobello, StrapiPortobello | null>(
    '/api/portobellos?populate[portobelloPrimary][populate]=image' +
      '&populate[portobelloSecondary][populate][imageTextCombo][populate]=image' +
      '&populate[portobelloHwd][populate][hwdOptions][populate]=image',
    (items) => items[0] ?? null,
    null,
  )
}
