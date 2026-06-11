import { motion } from 'framer-motion'
import { fadeUp } from '../../design-system/animations'
import { useMotionSafe } from '../../hooks/useMotionSafe'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  /** Center (default) or left-aligned */
  align?: 'center' | 'left'
  /** Use light text on dark/teal backgrounds */
  light?: boolean
}

const underline = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { delay: 0.3, duration: 0.5, ease: 'easeOut' } },
}

/** Animated section heading with a teal underline that draws in on scroll. */
export default function SectionHeading({
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  const variants = useMotionSafe(fadeUp)
  const underlineSafe = useMotionSafe(underline)
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
      className={`max-w-2xl mb-12 md:mb-16 ${alignment}`}
    >
      <h2
        className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold ${
          light ? 'text-white' : 'text-dark'
        }`}
      >
        {title}
      </h2>
      <motion.span
        variants={underlineSafe}
        className={`block h-1 w-20 rounded-full mt-4 origin-left ${
          light ? 'bg-white' : 'bg-primary'
        } ${align === 'center' ? 'mx-auto' : ''}`}
      />
      {subtitle && (
        <p className={`mt-5 text-base md:text-lg ${light ? 'text-white/85' : 'text-muted'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
