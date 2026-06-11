import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FLAVORS_SECTION } from '../../data/static.sk'
import { fadeUp } from '../../design-system/animations'
import { useMotionSafe } from '../../hooks/useMotionSafe'
import type { Flavor } from '../../types'
import Badge from './Badge'

/**
 * Flavor card with the flavor's own color sliding up from the bottom on
 * hover (scaleY overlay). Flavor colors come from CMS data, so they are
 * applied via inline style rather than Tailwind tokens.
 */
export default function FlavorCard({ flavor }: { flavor: Flavor }) {
  const variants = useMotionSafe(fadeUp)

  return (
    <motion.article
      variants={variants}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
      className="group relative bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden"
    >
      {/* Color wash sliding up on hover */}
      <div
        className="absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out opacity-10 motion-reduce:transition-none"
        style={{ backgroundColor: flavor.color }}
        aria-hidden="true"
      />

      <Link to={`/zmrzlina/${flavor.slug}`} className="relative block p-6 md:p-7">
        <div className="flex items-start justify-between gap-3">
          {/* Color chip / image */}
          {flavor.image ? (
            <img
              src={flavor.image}
              alt={flavor.name}
              loading="lazy"
              className="w-16 h-16 rounded-full object-cover ring-4 ring-off-white"
            />
          ) : (
            <span
              className="w-16 h-16 rounded-full ring-4 ring-off-white"
              style={{ backgroundColor: flavor.color }}
              aria-hidden="true"
            />
          )}
          <Badge kind="type" flavorType={flavor.type} />
        </div>

        <h3 className="font-display text-xl md:text-2xl font-bold text-dark mt-5">
          {flavor.name}
        </h3>
        <p className="font-accent italic text-lg text-muted mt-1">{flavor.tagline}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {flavor.isVegan && <Badge kind="vegan" />}
          {flavor.isGlutenFree && <Badge kind="gluten-free" />}
        </div>

        <span className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-primary-dark group-hover:gap-3 transition-all duration-300">
          {FLAVORS_SECTION.detailCta}
          <span aria-hidden="true">→</span>
        </span>
      </Link>
    </motion.article>
  )
}
