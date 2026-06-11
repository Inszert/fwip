import { motion } from 'framer-motion'
import CtaStrip from '../components/sections/CtaStrip'
import { PLACES } from '../data/static.sk'
import { fadeUp, slideInLeft, slideInRight } from '../design-system/animations'
import { useMotionSafe } from '../hooks/useMotionSafe'
import { PAGE_META, usePageMeta } from '../hooks/usePageMeta'
import { usePlaces } from '../hooks/usePlaces'

export default function PlacesPage() {
  usePageMeta(PAGE_META.places)
  const { data: place } = usePlaces()
  const fadeUpSafe = useMotionSafe(fadeUp)
  const left = useMotionSafe(slideInLeft)
  const right = useMotionSafe(slideInRight)

  const headline = place?.landing_text1 || PLACES.heading
  const subheadline = place?.lending_text2 || PLACES.subheading
  const heroImage = place?.lending_image?.url

  // Strapi hero sections when available (incl. their CMS colors), static copy otherwise
  const fallbackColors = ['#40DDCB', '#F472B6', '#A78BFA']
  const sections =
    place?.first_hero_section && place.first_hero_section.length > 0
      ? place.first_hero_section.map((s, i) => ({
          id: s.id,
          title: s.text1 || '',
          headline: s.text2 || '',
          description: s.text3 || '',
          image: s.image?.[0]?.url,
          imageAlt: s.image?.[0]?.alternativeText || s.text1 || '',
          bgColor: s.bg_color || fallbackColors[i % fallbackColors.length],
          titleColor: s.text1_color || undefined,
          headlineColor: s.text2_color || undefined,
          textColor: s.text3_color || undefined,
        }))
      : PLACES.sections.map((s, i) => ({
          id: i,
          title: s.title,
          headline: s.headline,
          description: s.description,
          image: undefined,
          imageAlt: '',
          bgColor: fallbackColors[i % fallbackColors.length],
          titleColor: undefined,
          headlineColor: undefined,
          textColor: undefined,
        }))

  return (
    <>
      {/* Hero — teal base, light overlay over the Strapi image */}
      <section className="relative bg-primary min-h-[70vh] flex items-center pt-32 pb-16 overflow-hidden">
        {heroImage && (
          <>
            <img
              src={heroImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-dark/35" aria-hidden="true" />
          </>
        )}
        <motion.div
          variants={fadeUpSafe}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase">
            {headline}
          </h1>
          <p className="font-accent italic text-xl md:text-2xl lg:text-3xl text-white/85 mt-6 max-w-3xl mx-auto">
            {subheadline}
          </p>
        </motion.div>
      </section>

      {/* Alternating sections — light, with the CMS color as a subtle accent */}
      {sections.map((section, i) => {
        const imageRight = i % 2 === 0
        // 6-digit hex from CMS → ~14% alpha tint for the image backdrop
        const tint = /^#[0-9a-fA-F]{6}$/.test(section.bgColor)
          ? `${section.bgColor}24`
          : undefined
        return (
          <section
            key={section.id}
            className={`py-20 md:py-28 overflow-hidden ${i % 2 === 0 ? 'bg-off-white' : 'bg-white'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={imageRight ? left : right}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className={imageRight ? 'lg:order-1' : 'lg:order-2'}
              >
                <p
                  className="font-semibold tracking-[0.2em] uppercase text-xs md:text-sm"
                  // CMS section color as a small accent on the eyebrow + underline only
                  style={{ color: section.bgColor }}
                >
                  {section.title}
                </p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-dark mt-3">
                  {section.headline}
                </h2>
                <span
                  className="block h-1 w-16 rounded-full mt-4"
                  style={{ backgroundColor: section.bgColor }}
                  aria-hidden="true"
                />
                <p className="text-muted text-base md:text-lg mt-5 leading-relaxed max-w-xl">
                  {section.description}
                </p>
              </motion.div>

              <motion.div
                variants={imageRight ? right : left}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className={`flex justify-center ${imageRight ? 'lg:order-2' : 'lg:order-1'}`}
              >
                <div
                  className="rounded-3xl p-6 md:p-10 w-full flex justify-center bg-primary-light"
                  style={tint ? { backgroundColor: tint } : undefined}
                >
                  {section.image ? (
                    <img
                      src={section.image}
                      alt={section.imageAlt}
                      loading="lazy"
                      className="max-h-[400px] w-auto object-contain drop-shadow-xl"
                    />
                  ) : (
                    <span className="text-7xl py-16" aria-hidden="true">
                      🍨
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        )
      })}

      <CtaStrip title="Zvýšte tržby vašej prevádzky s fwip" buttonLabel="Staňte sa partnerom" />
    </>
  )
}
