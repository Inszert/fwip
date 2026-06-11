import type { StrapiPlace } from '../types'
import { useStrapi } from './useStrapi'

/** B2B "vaša prevádzka" page content from the places collection. */
export function usePlaces() {
  return useStrapi<StrapiPlace, StrapiPlace | null>(
    '/api/places?populate[0]=lending_image&populate[1]=first_hero_section.image',
    (items) => items[0] ?? null,
    null,
  )
}
