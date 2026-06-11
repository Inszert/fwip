import type { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
}

/** Page-level transition used with AnimatePresence in App.tsx */
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
}

/**
 * Reduced-motion variants: identical keys, no movement.
 * Returned by useMotionSafe() when prefers-reduced-motion is active.
 */
export const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.01 } },
  exit: { opacity: 1 },
}
