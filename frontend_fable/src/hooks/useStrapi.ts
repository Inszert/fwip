import { useEffect, useState } from 'react'
import { strapiGet } from '../lib/strapi'

export interface StrapiState<T> {
  data: T
  loading: boolean
  error: string | null
  /** true when `data` is the hardcoded fallback (API failed or empty) */
  isFallback: boolean
}

/**
 * Generic Strapi fetch hook.
 *
 * Fetches `path` (e.g. "/api/ice-creams?populate=*"), maps the raw Strapi
 * items through `transform`, and falls back to `fallback` when the request
 * fails or returns an empty list — pages always have data to render.
 */
export function useStrapi<TRaw, TOut>(
  path: string,
  transform: (items: TRaw[]) => TOut,
  fallback: TOut,
): StrapiState<TOut> {
  const [state, setState] = useState<StrapiState<TOut>>({
    data: fallback,
    loading: true,
    error: null,
    isFallback: true,
  })

  useEffect(() => {
    let cancelled = false

    strapiGet<TRaw>(path)
      .then((res) => {
        if (cancelled) return
        if (!res.data || res.data.length === 0) {
          setState({ data: fallback, loading: false, error: null, isFallback: true })
          return
        }
        setState({
          data: transform(res.data),
          loading: false,
          error: null,
          isFallback: false,
        })
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setState({
          data: fallback,
          loading: false,
          error: err instanceof Error ? err.message : 'Chyba pri načítaní dát',
          isFallback: true,
        })
      })

    return () => {
      cancelled = true
    }
    // path is the identity of the request; transform/fallback are stable per call site
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  return state
}
