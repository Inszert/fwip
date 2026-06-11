import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import FlavorCard from '../components/ui/FlavorCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { fadeUp, stagger } from '../design-system/animations'
import { useMotionSafe } from '../hooks/useMotionSafe'
import { useProducts } from '../hooks/useProducts'

export default function FlavorDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: flavors, loading } = useProducts()
  const fadeUpSafe = useMotionSafe(fadeUp)
  const staggerSafe = useMotionSafe(stagger)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-off-white">
        <LoadingSpinner />
      </div>
    )
  }

  const flavor = flavors.find((f) => f.slug === slug)

  if (!flavor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-off-white px-4 text-center gap-6">
        <h1 className="font-display text-3xl font-bold text-dark">Príchuť sa nenašla</h1>
        <Button to="/zmrzlina">Späť na príchute</Button>
      </div>
    )
  }

  const others = flavors.filter((f) => f.slug !== slug)

  return (
    <>
      {/* Full-width hero in the flavor's own color (CMS data → inline style) */}
      <section
        className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden"
        style={{ backgroundColor: flavor.color }}
      >
        <div className="absolute inset-0 bg-dark/45" aria-hidden="true" />
        <motion.div
          variants={fadeUpSafe}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <div>
            <Badge kind="type" flavorType={flavor.type} />
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
              {flavor.name}
            </h1>
            <p className="font-accent italic text-2xl md:text-3xl text-white/85 mt-4">
              {flavor.tagline}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {flavor.isVegan && <Badge kind="vegan" />}
              {flavor.isGlutenFree && <Badge kind="gluten-free" />}
              {flavor.type === 'Frozen Yogurt' && <Badge kind="less-fat" />}
            </div>
          </div>
          {flavor.image && (
            <div className="flex justify-center md:justify-end">
              <img
                src={flavor.image}
                alt={flavor.name}
                className="max-h-80 md:max-h-96 w-auto object-contain drop-shadow-2xl rounded-2xl"
              />
            </div>
          )}
        </motion.div>
      </section>

      {/* Description */}
      <section className="py-16 md:py-24 bg-off-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-dark mb-6">
            O tejto príchuti
          </h2>
          <p className="text-text text-base md:text-lg leading-relaxed whitespace-pre-line">
            {flavor.description}
          </p>
          <div className="mt-10">
            <Button to="/kontakt" size="lg">
              Chcem fwip pre môj biznis
            </Button>
          </div>
        </div>
      </section>

      {/* Other flavors — horizontal scroll */}
      {others.length > 0 && (
        <section className="py-16 md:py-20 bg-primary-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-dark">
                Ďalšie príchute
              </h2>
              <Link
                to="/zmrzlina"
                className="text-primary-dark font-semibold text-sm hover:text-primary transition-colors"
              >
                Všetky →
              </Link>
            </div>
            <motion.div
              variants={staggerSafe}
              initial="hidden"
              animate="visible"
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x"
            >
              {others.map((f) => (
                <div key={f.id} className="min-w-[280px] sm:min-w-[320px] snap-start">
                  <FlavorCard flavor={f} />
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </>
  )
}
