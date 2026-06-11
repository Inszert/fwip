import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FLAVORS_SECTION } from '../../data/static.sk'
import { fadeUp } from '../../design-system/animations'
import { useMotionSafe } from '../../hooks/useMotionSafe'
import { isLightColor } from '../../lib/text'
import type { Flavor } from '../../types'
import Badge from './Badge'

/**
 * Flavor card: clean white at rest (pops on a colored section background),
 * flooded by the flavor's own color on hover with the text flipping to
 * white and the capsule popping. Flavor colors are CMS data → inline style.
 */
export default function FlavorCard({ flavor }: { flavor: Flavor }) {
  const variants = useMotionSafe(fadeUp)
  // Light flavors (vanilla, yogurt) keep dark text on the flooded card
  const lightFlavor = isLightColor(flavor.color)
  const hoverText = lightFlavor ? 'group-hover:text-dark' : 'group-hover:text-white'
  const hoverTextSoft = lightFlavor ? 'group-hover:text-dark/75' : 'group-hover:text-white/85'

  return (
    <motion.article
      variants={variants}
      whileHover={{ scale: 1.04, y: -8 }}
      transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
      className="group relative h-full bg-white rounded-[2rem] shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden"
    >
      {/* Full color flood sliding up on hover */}
      <div
        className="absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out motion-reduce:transition-none"
        style={{ backgroundColor: flavor.color }}
        aria-hidden="true"
      />

      <Link
        to={`/zmrzlina/${flavor.slug}`}
        className="relative flex flex-col items-center text-center p-7 md:p-8 h-full"
      >
        {/* Big capsule that pops on hover */}
        {flavor.image ? (
          <img
            src={flavor.image}
            alt={flavor.name}
            loading="lazy"
            className="h-36 md:h-44 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transition-none"
            style={{ filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.25))' }}
          />
        ) : (
          <span
            className="w-36 h-36 rounded-full ring-8 ring-off-white"
            style={{ backgroundColor: flavor.color }}
            aria-hidden="true"
          />
        )}

        <div className="mt-6 flex items-center justify-center">
          <Badge kind="type" flavorType={flavor.type} />
        </div>

        <h3
          className={`font-display text-2xl md:text-3xl font-bold text-dark mt-3 transition-colors duration-300 ${hoverText}`}
        >
          {flavor.name}
        </h3>
        <p
          className={`font-accent italic text-lg text-muted mt-2 transition-colors duration-300 ${hoverTextSoft}`}
        >
          {flavor.tagline}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {flavor.isVegan && <Badge kind="vegan" />}
          {flavor.isGlutenFree && <Badge kind="gluten-free" />}
        </div>

        <span
          className={`inline-flex items-center gap-1.5 mt-auto pt-6 text-sm font-bold uppercase tracking-wider text-primary-dark transition-all duration-300 group-hover:gap-3 ${hoverText}`}
        >
          {FLAVORS_SECTION.detailCta}
          <span aria-hidden="true">→</span>
        </span>
      </Link>
    </motion.article>
  )
}
