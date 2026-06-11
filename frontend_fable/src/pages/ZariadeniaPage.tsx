import { motion } from 'framer-motion'
import CtaStrip from '../components/sections/CtaStrip'
import Button from '../components/ui/Button'
import { ZARIADENIA } from '../data/static.sk'
import { fadeUp, stagger } from '../design-system/animations'
import { sentenceCase } from '../lib/text'
import { useMotionSafe } from '../hooks/useMotionSafe'
import { useZariadenia } from '../hooks/useZariadenia'
import type { StrapiButton } from '../types'

function unitButton(button: StrapiButton | StrapiButton[] | null | undefined) {
  if (!button) return null
  return Array.isArray(button) ? button[0] ?? null : button
}

export default function ZariadeniaPage() {
  const { data: zariadenia } = useZariadenia()
  const fadeUpSafe = useMotionSafe(fadeUp)
  const staggerSafe = useMotionSafe(stagger)

  const title = sentenceCase(zariadenia?.text1 || ZARIADENIA.heading)
  const subtitle = sentenceCase(zariadenia?.text2 || ZARIADENIA.subheading)
  const description = zariadenia?.text3 || ZARIADENIA.description
  const heroImage = zariadenia?.main_image?.[0]?.url
  const units = zariadenia?.units_part ?? []

  return (
    <>
      {/* Hero — teal base, light overlay over the Strapi image */}
      <section className="relative bg-primary pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {heroImage && (
          <>
            <img
              src={heroImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-dark/45" aria-hidden="true" />
          </>
        )}
        <motion.div
          variants={fadeUpSafe}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow">
            {title}
          </h1>
          <p
            className={`font-accent italic text-2xl md:text-3xl mt-4 ${
              heroImage ? 'text-primary' : 'text-dark/80'
            }`}
          >
            {subtitle}
          </p>
          <p
            className={`text-base md:text-lg mt-6 leading-relaxed ${
              heroImage ? 'text-white/85' : 'text-dark/80'
            }`}
          >
            {description}
          </p>
        </motion.div>
      </section>

      {/* Units */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {units.length === 0 ? (
            <div className="text-center max-w-xl mx-auto">
              <p className="text-muted text-lg">
                Kompletnú ponuku zariadení vám radi predstavíme osobne.
              </p>
              <div className="mt-8">
                <Button to="/kontakt" size="lg">
                  Kontaktujte nás
                </Button>
              </div>
            </div>
          ) : (
            <motion.div
              variants={staggerSafe}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {units.map((unit) => {
                const btn = unitButton(unit.button)
                return (
                  /* Circular unit photos, fwip.com style */
                  <motion.article
                    key={unit.id}
                    variants={fadeUpSafe}
                    whileHover={{ y: -6 }}
                    transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
                    className="flex flex-col items-center text-center"
                  >
                    {unit.image?.url ? (
                      <img
                        src={unit.image.url}
                        alt={unit.image.alternativeText || unit.text1 || 'Zariadenie'}
                        loading="lazy"
                        className="w-52 h-52 md:w-60 md:h-60 rounded-full object-cover ring-8 ring-white shadow-card-hover"
                      />
                    ) : (
                      <div
                        className="w-52 h-52 md:w-60 md:h-60 rounded-full bg-primary-light ring-8 ring-white shadow-card flex items-center justify-center text-6xl"
                        aria-hidden="true"
                      >
                        🍦
                      </div>
                    )}
                    <div className="mt-6 flex flex-col items-center flex-1 max-w-xs">
                      {unit.text1 && (
                        <h2 className="font-display text-2xl font-bold text-dark">
                          {sentenceCase(unit.text1)}
                        </h2>
                      )}
                      {unit.text2 && (
                        <p className="text-muted text-sm mt-3 leading-relaxed flex-1">
                          {unit.text2}
                        </p>
                      )}
                      {unit.text3 && (
                        <p className="font-accent italic text-primary-dark mt-2">{unit.text3}</p>
                      )}
                      {btn?.text && (
                        <div className="mt-5">
                          <Button to={btn.url ? `/${btn.url.replace(/^\/+/, '')}` : '/kontakt'}>
                            {sentenceCase(btn.text)}
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          )}
        </div>
      </section>

      <CtaStrip />
    </>
  )
}
