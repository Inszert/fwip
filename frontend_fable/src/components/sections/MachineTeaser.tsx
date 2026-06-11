import { motion } from 'framer-motion'
import { MACHINE } from '../../data/static.sk'
import { slideInLeft, slideInRight } from '../../design-system/animations'
import { useMotionSafe } from '../../hooks/useMotionSafe'
import { usePortobello } from '../../hooks/usePortobello'
import Button from '../ui/Button'

/** Home page teaser for the Portobello machine. */
export default function MachineTeaser() {
  const { data: portobello } = usePortobello()
  const left = useMotionSafe(slideInLeft)
  const right = useMotionSafe(slideInRight)

  const imageUrl = portobello?.portobelloPrimary?.image?.url
  const title = portobello?.portobelloPrimary?.textField1 || MACHINE.heading
  const description = portobello?.portobelloPrimary?.textField3 || MACHINE.description

  return (
    <section className="py-20 md:py-28 bg-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={left}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="text-primary font-semibold tracking-[0.25em] uppercase text-xs md:text-sm">
            {MACHINE.tagline}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4">
            {title}
          </h2>
          <p className="text-white/75 text-base md:text-lg mt-6 leading-relaxed max-w-xl">
            {description}
          </p>
          <div className="mt-8">
            <Button to="/portobello" size="lg">
              {MACHINE.cta}
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={right}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex justify-center"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={portobello?.portobelloPrimary?.image?.alternativeText || 'Stroj Portobello'}
              loading="lazy"
              className="max-h-[480px] w-auto object-contain drop-shadow-2xl rounded-2xl"
            />
          ) : (
            <div
              className="w-full max-w-md aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="text-8xl">🍦</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
