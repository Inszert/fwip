import type { StrapiComparison } from '../types'
import { useStrapi } from './useStrapi'

function transform(items: StrapiComparison[]): StrapiComparison | null {
  return items[0] ?? null
}

/** Comparison table content (fwip vs. traditional). Null → use static fallback. */
export function useComparisons() {
  return useStrapi<StrapiComparison, StrapiComparison | null>(
    '/api/comparisons?populate[button][populate]=*&populate[types][populate]=*&populate[property][populate]=*',
    transform,
    null,
  )
}
