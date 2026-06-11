import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FLAVORS_SECTION } from '../../data/static.sk'
import { stagger } from '../../design-system/animations'
import { useMotionSafe } from '../../hooks/useMotionSafe'
import type { Flavor } from '../../types'
import FlavorCard from '../ui/FlavorCard'
import LoadingSpinner from '../ui/LoadingSpinner'
import SectionHeading from '../ui/SectionHeading'

interface FlavorGridProps {
  flavors: Flavor[]
  loading?: boolean
  /** Show the section heading + "all flavors" link (home page variant) */
  withHeading?: boolean
  /** Limit number of cards shown */
  limit?: number
}

export default function FlavorGrid({
  flavors,
  loading = false,
  withHeading = false,
  limit,
}: FlavorGridProps) {
  const staggerSafe = useMotionSafe(stagger)
  const shown = limit ? flavors.slice(0, limit) : flavors

  return (
    <section className="py-20 md:py-28 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {withHeading && (
          <SectionHeading
            title={FLAVORS_SECTION.heading}
            subtitle={FLAVORS_SECTION.subheading}
          />
        )}

        {loading ? (
          <LoadingSpinner />
        ) : shown.length === 0 ? (
          <p className="text-center text-muted py-12">Momentálne nie sú dostupné žiadne príchute.</p>
        ) : (
          <motion.div
            variants={staggerSafe}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {shown.map((flavor) => (
              <FlavorCard key={flavor.id} flavor={flavor} />
            ))}
          </motion.div>
        )}

        {withHeading && (
          <div className="text-center mt-12">
            <Link
              to="/zmrzlina"
              className="inline-flex items-center gap-2 text-primary-dark font-semibold hover:text-primary transition-colors"
            >
              {FLAVORS_SECTION.cta}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
