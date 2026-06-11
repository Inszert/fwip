import { useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { reducedVariants } from '../design-system/animations'

/**
 * Returns the given variants, or motion-free equivalents when the user
 * prefers reduced motion. Every motion component must source its variants
 * through this hook.
 */
export function useMotionSafe(variants: Variants): Variants {
  const prefersReduced = useReducedMotion()
  return prefersReduced ? reducedVariants : variants
}
