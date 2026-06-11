import { useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * useInView wrapper for scroll-triggered animations.
 * Returns a ref to attach and whether the element has entered the viewport
 * (fires once, slightly before fully visible).
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  return { ref, inView }
}
