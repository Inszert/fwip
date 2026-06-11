import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import type { MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FLAVORS_SECTION } from '../../data/static.sk'
import { fadeUp, stagger } from '../../design-system/animations'
import { useMotionSafe } from '../../hooks/useMotionSafe'
import { isLightColor } from '../../lib/text'
import type { Flavor } from '../../types'
import LoadingSpinner from '../ui/LoadingSpinner'

interface SignatureFlavorsProps {
  flavors: Flavor[]
  loading?: boolean
}

interface MousePos {
  x: number
  y: number
}

/** Bouncy ease from the original SignatureRecipes */
const BOUNCE = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'

/**
 * Desktop flavor item — faithful port of the original geometry:
 * 200×250 card, 180px capsule, 240px jump with 1.25 scale, ingredients
 * anchored at top:130px with mouse parallax, info card revealed inside
 * the card bounds (bottom-0, 220px tall, 130% wide).
 */
function DesktopFlavorItem({
  flavor,
  hovered,
  setHovered,
  mouse,
  setMouse,
}: {
  flavor: Flavor
  hovered: number | null
  setHovered: (id: number | null) => void
  mouse: MousePos
  setMouse: (pos: MousePos) => void
}) {
  const navigate = useNavigate()
  const prefersReduced = useReducedMotion()
  const fadeUpSafe = useMotionSafe(fadeUp)
  const isHovered = hovered === flavor.id
  const lightFlavor = isLightColor(flavor.color)
  const cardText = lightFlavor ? 'text-dark' : 'text-white'
  const cardTextSoft = lightFlavor ? 'text-dark/75' : 'text-white/90'

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isHovered || prefersReduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    setMouse({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    })
  }

  return (
    <motion.div
      variants={fadeUpSafe}
      className="group relative w-[180px] h-[250px] pt-7 flex flex-col items-center cursor-pointer"
      style={{ perspective: 1200 }}
      role="link"
      tabIndex={0}
      aria-label={flavor.name}
      onMouseEnter={() => setHovered(flavor.id)}
      onMouseLeave={() => setHovered(null)}
      onMouseMove={handleMouseMove}
      onFocus={() => setHovered(flavor.id)}
      onBlur={() => setHovered(null)}
      onClick={() => navigate(`/zmrzlina/${flavor.slug}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/zmrzlina/${flavor.slug}`)}
    >
      {/* Floating ingredients with mouse parallax (original anchor: top 130px) */}
      {(flavor.ingredients || []).map((ing, idx) => {
        const speed = ing.parallaxSpeed * (1 + idx * 0.05)
        const dir = idx % 2 === 0 ? 1 : -1
        const show = isHovered && !prefersReduced
        return (
          <div
            key={ing.id}
            className="absolute pointer-events-none z-50"
            style={{
              left: '50%',
              top: 130,
              width: ing.size,
              height: ing.size,
              transform: `translate(calc(-50% + ${ing.x}px - ${
                show ? mouse.x * speed * dir : 0
              }px), calc(-50% + ${ing.y}px - ${
                show ? mouse.y * speed * dir : 0
              }px)) rotate(${ing.rotation}deg) scale(${show ? 1 : 0.8})`,
              opacity: show ? 0.95 : 0,
              transition: 'opacity 300ms ease-out, transform 100ms ease-out',
              filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.18))',
            }}
            aria-hidden="true"
          >
            <img src={ing.url} alt="" className="w-full h-full object-contain" />
          </div>
        )
      })}

      {/* Jumping capsule — fixed 180×180 like the original */}
      <div
        className={`relative z-40 ${
          prefersReduced
            ? ''
            : 'transition-transform duration-[600ms] group-hover:-translate-y-60 group-hover:scale-[1.25]'
        }`}
        style={{ transitionTimingFunction: BOUNCE, transformStyle: 'preserve-3d' }}
      >
        {flavor.image ? (
          <img
            src={flavor.image}
            alt={flavor.name}
            width={195}
            height={195}
            loading="lazy"
            className={`w-[195px] h-[195px] max-w-none object-contain rounded-2xl ${
              prefersReduced
                ? ''
                : 'transition-transform duration-[600ms] group-hover:[transform:rotateY(20deg)_rotateZ(-12deg)]'
            }`}
            style={{
              transformStyle: 'preserve-3d',
              filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4))',
            }}
            draggable={false}
          />
        ) : (
          <div
            className="w-[180px] h-[180px] rounded-full ring-8 ring-white/30 shadow-2xl"
            style={{ backgroundColor: flavor.color }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Info card revealed under the jump — inside the card bounds */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[130%] h-[220px] rounded-[2rem] shadow-2xl p-6 pt-14 text-left opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out z-30 motion-reduce:transition-none"
        style={{ backgroundColor: flavor.color }}
      >
        <div className="opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[400ms] delay-150 motion-reduce:transition-none">
          <h3 className={`text-xl font-bold uppercase tracking-wide ${cardText}`}>
            {flavor.name}
          </h3>
          <p className={`leading-snug text-sm mt-2 ${cardTextSoft}`}>{flavor.tagline}</p>
        </div>
      </div>

      {/* Glowing base */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 z-0"
        style={{ backgroundColor: flavor.color }}
        aria-hidden="true"
      />
    </motion.div>
  )
}

/** Mobile item — no hover on touch, so a simple colored snap card */
function MobileFlavorItem({ flavor }: { flavor: Flavor }) {
  const lightFlavor = isLightColor(flavor.color)
  return (
    <Link
      to={`/zmrzlina/${flavor.slug}`}
      className="snap-center shrink-0 w-[230px] rounded-[2rem] p-6 text-center shadow-xl"
      style={{ backgroundColor: flavor.color }}
    >
      {flavor.image ? (
        <img
          src={flavor.image}
          alt={flavor.name}
          loading="lazy"
          className="h-36 w-auto mx-auto object-contain drop-shadow-xl"
        />
      ) : (
        <span
          className="block w-32 h-32 mx-auto rounded-full bg-white/25 ring-8 ring-white/20"
          aria-hidden="true"
        />
      )}
      <h3
        className={`text-lg font-bold uppercase tracking-wide mt-4 ${
          lightFlavor ? 'text-dark' : 'text-white'
        }`}
      >
        {flavor.name}
      </h3>
      <p
        className={`text-xs leading-relaxed mt-2 ${
          lightFlavor ? 'text-dark/75' : 'text-white/90'
        }`}
      >
        {flavor.tagline}
      </p>
    </Link>
  )
}

/**
 * "Naše ikonické talianske recepty" — the playful flavor showcase from the
 * original site: capsules that jump up on hover with their ingredient images
 * floating around (mouse-parallax) and a flavor-colored info card below.
 */
export default function SignatureFlavors({ flavors, loading = false }: SignatureFlavorsProps) {
  const staggerSafe = useMotionSafe(stagger)
  const fadeUpSafe = useMotionSafe(fadeUp)
  const [hovered, setHovered] = useState<number | null>(null)
  const [mouse, setMouse] = useState<MousePos>({ x: 0, y: 0 })

  return (
    <section className="relative bg-gradient-to-br from-primary to-primary-dark py-20 md:py-28 overflow-hidden">
      {/* Soft white glow blobs, like the original */}
      <div
        className="absolute top-10 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl opacity-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl opacity-10"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={fadeUpSafe}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            Naše ikonické
          </h2>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-4">
            talianske recepty
          </h2>
          <p className="font-accent italic text-xl md:text-2xl text-white/85 max-w-2xl mx-auto mb-12 md:mb-24">
            {FLAVORS_SECTION.subheading}
          </p>
        </motion.div>

        {loading ? (
          <LoadingSpinner label="Načítavam príchute…" />
        ) : (
          <>
            {/* Desktop: original hover-jump experience, no clipping container */}
            <motion.div
              variants={staggerSafe}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="hidden md:flex flex-wrap justify-center"
            >
              {flavors.map((flavor) => (
                <DesktopFlavorItem
                  key={flavor.id}
                  flavor={flavor}
                  hovered={hovered}
                  setHovered={setHovered}
                  mouse={mouse}
                  setMouse={setMouse}
                />
              ))}
            </motion.div>

            {/* Mobile: clean horizontal snap carousel of colored cards */}
            <div className="md:hidden -mx-4 px-4 flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
              {flavors.map((flavor) => (
                <MobileFlavorItem key={flavor.id} flavor={flavor} />
              ))}
            </div>
          </>
        )}

        <div className="relative z-10 mt-12 md:mt-16">
          <Link
            to="/zmrzlina"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-dark font-semibold hover:bg-dark hover:text-white transition-colors duration-300 shadow-lg"
          >
            {FLAVORS_SECTION.cta}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
