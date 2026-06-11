import type { StrapiPromoSection } from '../types'
import { useStrapi } from './useStrapi'

/** Promo sections shown on the Portobello page. Empty array → section hidden. */
export function usePromoSections() {
  return useStrapi<StrapiPromoSection, StrapiPromoSection[]>(
    '/api/promo-sections?populate=image',
    (items) => items,
    [],
  )
}
