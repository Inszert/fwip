import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp } from '../../design-system/animations'
import { useMotionSafe } from '../../hooks/useMotionSafe'

interface CardProps {
  children: ReactNode
  className?: string
  /** Disable the hover lift (e.g. for static info cards) */
  hover?: boolean
}

/** White rounded card with hover scale + shadow lift. */
export default function Card({ children, className = '', hover = true }: CardProps) {
  const variants = useMotionSafe(fadeUp)
  return (
    <motion.div
      variants={variants}
      whileHover={hover ? { scale: 1.03 } : undefined}
      transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
      className={`bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  )
}
