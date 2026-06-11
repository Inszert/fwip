import type { HeroVideoContent, StrapiHeroVideo } from '../types'
import { useStrapi } from './useStrapi'

const FALLBACK: HeroVideoContent = { headline: null, videoUrl: null }

function transform(items: StrapiHeroVideo[]): HeroVideoContent {
  const hero = items[0]
  return {
    headline: hero?.textField1 || null,
    videoUrl: hero?.video?.url || null,
  }
}

/** Landing page background video from the hero-videos collection. */
export function useHeroVideo() {
  return useStrapi<StrapiHeroVideo, HeroVideoContent>(
    '/api/hero-videos?populate=*',
    transform,
    FALLBACK,
  )
}
