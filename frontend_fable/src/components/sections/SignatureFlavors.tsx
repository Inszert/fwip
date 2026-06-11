import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import type { MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FLAVORS_SECTION } from '../../data/static.sk'
import { fadeUp, stagger } from '../../design-system/animations'
import { useMotionSafe } from '../../hooks/useMotionSafe'
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

/**
 * "Naše ikonické talianske recepty" — the playful flavor showcase from the
 * original site: capsules that jump up on hover with their ingredient images
 * floating around (mouse-parallax), and a flavor-colored info card below.
 */
export default function SignatureFlavors({ flavors, loading = false }: SignatureFlavorsProps) {
  const navigate = useNavigate()
  const prefersReduced = useReducedMotion()
  const staggerSafe = useMotionSafe(stagger)
  const fadeUpSafe = useMotionSafe(fadeUp)
  const [hovered, setHovered] = useState<number | null>(null)
  const [mouse, setMouse] = useState<MousePos>({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, id: number) => {
    if (hovered !== id || prefersReduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    setMouse({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    })
  }

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
          <p className="font-accent italic text-xl md:text-2xl text-white/85 max-w-2xl mx-auto mb-16 md:mb-28">
            {FLAVORS_SECTION.subheading}
          </p>
        </motion.div>

        {loading ? (
          <LoadingSpinner label="Načítavam príchute…" />
        ) : (
          <motion.div
            variants={staggerSafe}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex gap-2 md:gap-0 md:flex-wrap md:justify-center overflow-x-auto md:overflow-visible scrollbar-hide snap-x px-2 pb-56 md:pb-64 -mb-36 md:-mb-40"
          >
            {flavors.map((flavor) => {
              const isHovered = hovered === flavor.id
              return (
                <motion.div
                  key={flavor.id}
                  variants={fadeUpSafe}
                  className="group relative shrink-0 snap-center w-[180px] md:w-[200px] h-[230px] md:h-[250px] pt-6 cursor-pointer"
                  style={{ perspective: 1200 }}
                  role="link"
                  tabIndex={0}
                  aria-label={flavor.name}
                  onMouseEnter={() => setHovered(flavor.id)}
                  onMouseLeave={() => setHovered(null)}
                  onMouseMove={(e) => handleMouseMove(e, flavor.id)}
                  onFocus={() => setHovered(flavor.id)}
                  onBlur={() => setHovered(null)}
                  onClick={() => navigate(`/zmrzlina/${flavor.slug}`)}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/zmrzlina/${flavor.slug}`)}
                >
                  {/* Floating ingredients with mouse parallax */}
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

                  {/* Jumping capsule */}
                  <div
                    className={`relative z-40 mx-auto w-[150px] md:w-[180px] ${
                      prefersReduced
                        ? ''
                        : 'transition-transform duration-[600ms] group-hover:-translate-y-44 md:group-hover:-translate-y-56 group-hover:scale-[1.22]'
                    }`}
                    style={{
                      transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {flavor.image ? (
                      <img
                        src={flavor.image}
                        alt={flavor.name}
                        loading="lazy"
                        className={`w-full h-auto rounded-2xl ${
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
                        className="w-[150px] h-[150px] md:w-[180px] md:h-[180px] rounded-full ring-8 ring-white/30 shadow-2xl mx-auto"
                        style={{ backgroundColor: flavor.color }}
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {/* Flavor-colored info card revealed under the jump */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 bottom-[-180px] md:bottom-[-200px] w-[125%] rounded-[2rem] shadow-2xl p-5 pt-8 text-left opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out z-30 motion-reduce:transition-none"
                    style={{ backgroundColor: flavor.color, minHeight: 190 }}
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide drop-shadow">
                      {flavor.name}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-sm mt-2">
                      {flavor.tagline}
                    </p>
                  </div>

                  {/* Glowing base */}
                  <div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 z-0"
                    style={{ backgroundColor: flavor.color }}
                    aria-hidden="true"
                  />
                </motion.div>
              )
            })}
          </motion.div>
        )}

        <div className="relative z-10 mt-10">
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
