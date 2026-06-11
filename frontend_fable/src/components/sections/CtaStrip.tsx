import { motion } from 'framer-motion'
import { fadeUp } from '../../design-system/animations'
import { useMotionSafe } from '../../hooks/useMotionSafe'
import Button from '../ui/Button'

interface CtaStripProps {
  title?: string
  buttonLabel?: string
  to?: string
}

/** Teal full-width CTA strip used above the footer. */
export default function CtaStrip({
  title = 'Pripravení priniesť fwip do vašej prevádzky?',
  buttonLabel = 'Kontaktujte nás',
  to = '/kontakt',
}: CtaStripProps) {
  const variants = useMotionSafe(fadeUp)

  return (
    <section className="bg-primary">
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
      >
        <h2 className="font-display text-2xl md:text-3xl font-bold text-dark max-w-2xl">
          {title}
        </h2>
        <Button to={to} variant="secondary" size="lg" className="shrink-0">
          {buttonLabel}
        </Button>
      </motion.div>
    </section>
  )
}
