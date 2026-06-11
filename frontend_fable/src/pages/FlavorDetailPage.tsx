import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import FlavorCard from '../components/ui/FlavorCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { fadeUp, slideInLeft, slideInRight, stagger } from '../design-system/animations'
import { useMotionSafe } from '../hooks/useMotionSafe'
import { useProducts } from '../hooks/useProducts'

/**
 * Product page in the fwip.com style: full-bleed flavor-colored hero with a
 * large capsule render and floating ingredients, copy on the left, related
 * flavors below.
 */
export default function FlavorDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: flavors, loading } = useProducts()
  const fadeUpSafe = useMotionSafe(fadeUp)
  const left = useMotionSafe(slideInLeft)
  const right = useMotionSafe(slideInRight)
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
      {/* Full-bleed hero in the flavor's own color, fwip.com product style */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: flavor.color }}
      >
        {/* Soft radial glow behind the capsule */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-white/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-32 pb-20 w-full">
          {/* Copy */}
          <motion.div variants={left} initial="hidden" animate="visible">
            <nav className="text-white/70 text-sm mb-6" aria-label="Omrvinková navigácia">
              <Link to="/zmrzlina" className="hover:text-white transition-colors">
                Naše príchute
              </Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="text-white">{flavor.name}</span>
            </nav>

            <Badge kind="type" flavorType={flavor.type} />
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-5 drop-shadow">
              {flavor.name}
            </h1>
            <p className="font-accent italic text-2xl md:text-3xl text-white/90 mt-4">
              {flavor.tagline}
            </p>
            <p className="text-white/85 text-base md:text-lg mt-6 leading-relaxed max-w-xl whitespace-pre-line">
              {flavor.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-7">
              {flavor.isVegan && <Badge kind="vegan" />}
              {flavor.isGlutenFree && <Badge kind="gluten-free" />}
              {flavor.type === 'Frozen Yogurt' && <Badge kind="less-fat" />}
            </div>

            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Button to="/kontakt" variant="secondary" size="lg">
                Chcem fwip pre môj biznis
              </Button>
            </div>
          </motion.div>

          {/* Big capsule with its floating ingredients */}
          <motion.div
            variants={right}
            initial="hidden"
            animate="visible"
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {(flavor.ingredients || []).map((ing) => (
                <motion.img
                  key={ing.id}
                  src={ing.url}
                  alt=""
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 0.95, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
                  className="absolute z-20 pointer-events-none object-contain drop-shadow-xl motion-reduce:transition-none"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: ing.size,
                    height: ing.size,
                    transform: `translate(calc(-50% + ${ing.x * 1.4}px), calc(-50% + ${
                      ing.y * 0.9
                    }px)) rotate(${ing.rotation}deg)`,
                  }}
                />
              ))}
              {flavor.image ? (
                <img
                  src={flavor.image}
                  alt={flavor.name}
                  className="relative z-10 max-h-[420px] md:max-h-[540px] w-auto object-contain"
                  style={{ filter: 'drop-shadow(0 35px 60px rgba(0,0,0,0.35))' }}
                />
              ) : (
                <div
                  className="w-72 h-72 rounded-full bg-white/20 ring-8 ring-white/30"
                  aria-hidden="true"
                />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick facts strip */}
      <section className="bg-off-white py-14 md:py-16">
        <motion.div
          variants={fadeUpSafe}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-5 text-center"
        >
          {[
            { value: '7 s', label: 'čerstvo stočené' },
            { value: '100 %', label: 'talianska receptúra' },
            { value: flavor.isGlutenFree ? 'Áno' : 'Nie', label: 'bezlepkové' },
            { value: flavor.isVegan ? 'Áno' : 'Nie', label: 'vegánske' },
          ].map((fact) => (
            <div key={fact.label} className="bg-white rounded-2xl shadow-card px-4 py-6">
              <p className="font-display text-2xl md:text-3xl font-bold text-primary-dark">
                {fact.value}
              </p>
              <p className="text-muted text-xs md:text-sm mt-1 uppercase tracking-wide">
                {fact.label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Other flavors — horizontal scroll */}
      {others.length > 0 && (
        <section className="py-16 md:py-20 bg-primary-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-dark">
                Mohlo by vám chutiť
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
