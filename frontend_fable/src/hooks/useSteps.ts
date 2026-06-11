import { HOW_IT_WORKS } from '../data/static.sk'
import type { StepsContent, StrapiStep } from '../types'
import { useStrapi } from './useStrapi'

const FALLBACK: StepsContent = {
  heading: HOW_IT_WORKS.heading,
  subheading: HOW_IT_WORKS.subheading,
  steps: HOW_IT_WORKS.steps.map((s) => ({ label: s.title, description: s.description })),
}

function transform(items: StrapiStep[]): StepsContent {
  const item = items[0]
  if (!item) return FALLBACK

  const steps = (item.video || [])
    .filter((v) => v.text || v.video?.url)
    .map((v) => ({
      label: v.text || '',
      videoUrl: v.video?.url || undefined,
    }))

  return {
    heading: item.text1 || FALLBACK.heading,
    subheading: item.text2 || FALLBACK.subheading,
    steps: steps.length > 0 ? steps : FALLBACK.steps,
  }
}

/** "Jednoducho v troch krokoch" content with circular step videos. */
export function useSteps() {
  return useStrapi<StrapiStep, StepsContent>(
    '/api/stepss?populate[video][populate]=*',
    transform,
    FALLBACK,
  )
}
