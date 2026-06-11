import { motion } from 'framer-motion'
import { B2B } from '../../data/static.sk'
import { fadeUp, slideInLeft, slideInRight, stagger } from '../../design-system/animations'
import { useMotionSafe } from '../../hooks/useMotionSafe'
import { usePlaces } from '../../hooks/usePlaces'
import Button from '../ui/Button'

export default function B2BSection() {
  const { data: place } = usePlaces()
  const staggerSafe = useMotionSafe(stagger)
  const fadeUpSafe = useMotionSafe(fadeUp)
  const left = useMotionSafe(slideInLeft)
  const right = useMotionSafe(slideInRight)

  const imageUrl = place?.lending_image?.url || place?.first_hero_section?.[0]?.image?.[0]?.url

  return (
    <section className="py-20 md:py-28 bg-off-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text + points */}
        <motion.div
          variants={left}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-dark">
            {B2B.heading}
          </h2>
          <span className="block h-1 w-20 bg-primary rounded-full mt-4" aria-hidden="true" />
          <p className="text-muted text-base md:text-lg mt-6 leading-relaxed">{B2B.description}</p>

          <motion.ul
            variants={staggerSafe}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-8 space-y-3"
          >
            {B2B.points.map((point) => (
              <motion.li
                key={point}
                variants={fadeUpSafe}
                className="flex items-center gap-3 bg-white rounded-2xl shadow-card px-5 py-4 text-sm md:text-base font-medium text-text"
              >
                <span
                  className="w-7 h-7 shrink-0 rounded-full bg-primary-light text-primary-dark flex items-center justify-center"
                  aria-hidden="true"
                >
                  ✓
                </span>
                {point}
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-9">
            <Button to="/kontakt" size="lg">
              {B2B.cta}
            </Button>
          </div>
        </motion.div>

        {/* Image from the places collection */}
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
              alt="fwip vo vašej prevádzke"
              loading="lazy"
              className="w-full max-w-xl rounded-3xl shadow-card-hover object-cover aspect-[4/3]"
            />
          ) : (
            <div
              className="w-full max-w-xl aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary-light to-primary/30 shadow-card flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="text-8xl">🍨</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
