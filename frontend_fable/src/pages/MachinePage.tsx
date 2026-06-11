import { motion } from 'framer-motion'
import CtaStrip from '../components/sections/CtaStrip'
import HowItWorks from '../components/sections/HowItWorks'
import HwdSection from '../components/sections/HwdSection'
import Button from '../components/ui/Button'
import SectionHeading from '../components/ui/SectionHeading'
import { B2B, MACHINE } from '../data/static.sk'
import { fadeUp, scaleIn, slideInLeft, slideInRight, stagger } from '../design-system/animations'
import { sentenceCase } from '../lib/text'
import { useMotionSafe } from '../hooks/useMotionSafe'
import { usePortobello } from '../hooks/usePortobello'
import { usePromoSections } from '../hooks/usePromoSections'

function FeaturesGrid() {
  const { data: portobello } = usePortobello()
  const staggerSafe = useMotionSafe(stagger)
  const scaleInSafe = useMotionSafe(scaleIn)

  // Strapi portobelloSecondary features when available, static specs otherwise
  const strapiFeatures =
    portobello?.portobelloSecondary?.imageTextCombo
      ?.filter((item) => item.text)
      .map((item) => ({
        title: sentenceCase(item.text || ''),
        description: '',
        iconUrl: item.image?.url,
      })) ?? []

  const features =
    strapiFeatures.length > 0
      ? strapiFeatures
      : MACHINE.features.map((f) => ({ ...f, iconUrl: undefined }))

  const heading = sentenceCase(portobello?.portobelloSecondary?.subtitle || 'Prečo Portobello?')

  return (
    <section className="py-20 md:py-28 bg-off-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={heading} />
        <motion.div
          variants={staggerSafe}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-wrap justify-center gap-5"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title || i}
              variants={scaleInSafe}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 px-6 py-6 flex items-center gap-4 w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
            >
              {feature.iconUrl ? (
                <img
                  src={feature.iconUrl}
                  alt=""
                  loading="lazy"
                  className="w-12 h-12 shrink-0 object-contain"
                />
              ) : (
                <span
                  className="w-12 h-12 shrink-0 rounded-full bg-primary-light text-primary-dark text-xl flex items-center justify-center"
                  aria-hidden="true"
                >
                  ✓
                </span>
              )}
              <div className="text-left">
                <h3 className="font-semibold text-dark leading-snug">{feature.title}</h3>
                {feature.description && (
                  <p className="text-muted text-sm mt-1 leading-relaxed">{feature.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function PromoSections() {
  const { data: promos } = usePromoSections()
  const left = useMotionSafe(slideInLeft)
  const right = useMotionSafe(slideInRight)

  if (promos.length === 0) return null

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">
        {promos.slice(0, 5).map((promo, i) => {
          const imageLeft = promo.imagePosition === 'left'
          return (
            <div
              key={promo.id ?? i}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              <motion.div
                variants={imageLeft ? left : right}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className={`flex justify-center ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}
              >
                {promo.image?.url && (
                  <div
                    className="rounded-3xl p-6 md:p-10 w-full flex justify-center"
                    // CMS-managed accent color as a soft tinted backdrop
                    style={{ backgroundColor: `${promo.backgroundColor || '#E8FAF8'}` }}
                  >
                    <img
                      src={promo.image.url}
                      alt={promo.image.alternativeText || promo.row1 || ''}
                      loading="lazy"
                      className="max-h-80 w-auto object-contain drop-shadow-lg"
                    />
                  </div>
                )}
              </motion.div>

              <motion.div
                variants={imageLeft ? right : left}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className={imageLeft ? 'lg:order-2' : 'lg:order-1'}
              >
                {promo.row1 && (
                  <p className="text-primary-dark font-semibold tracking-[0.2em] uppercase text-xs md:text-sm">
                    {sentenceCase(promo.row1)}
                  </p>
                )}
                {promo.row2 && (
                  <h3
                    className="font-display text-3xl md:text-4xl font-bold mt-3 leading-tight"
                    style={{ color: promo.row2Color || undefined }}
                  >
                    {sentenceCase(promo.row2)}
                  </h3>
                )}
                {promo.row3 && (
                  <p className="text-muted text-base md:text-lg mt-5 leading-relaxed max-w-xl">
                    {promo.row3}
                  </p>
                )}
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function StatsSection() {
  const staggerSafe = useMotionSafe(stagger)
  const fadeUpSafe = useMotionSafe(fadeUp)

  return (
    <section className="py-20 md:py-28 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerSafe}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {MACHINE.stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUpSafe}>
              <p className="font-display text-4xl md:text-5xl font-bold text-dark">
                {stat.value}
              </p>
              <p className="text-dark/70 mt-2 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default function MachinePage() {
  const { data: portobello } = usePortobello()
  const fadeUpSafe = useMotionSafe(fadeUp)

  const primary = portobello?.portobelloPrimary
  const title = sentenceCase(primary?.textField1 || MACHINE.heading)
  const subtitle = primary?.textField2 || MACHINE.tagline
  const description = primary?.textField3 || MACHINE.description

  return (
    <>
      {/* Hero — bright teal, fwip.com style */}
      <section className="bg-primary pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <motion.div
          variants={fadeUpSafe}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <p className="text-dark/70 font-semibold tracking-[0.25em] uppercase text-xs md:text-sm">
              {subtitle}
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
              {title}
            </h1>
            <p className="text-dark/80 text-base md:text-lg mt-6 leading-relaxed max-w-xl">
              {description}
            </p>
            <div className="mt-8">
              <Button to="/kontakt" variant="secondary" size="lg">
                {B2B.cta}
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            {primary?.image?.url ? (
              <img
                src={primary.image.url}
                alt={primary.image.alternativeText || 'Stroj Portobello'}
                className="max-h-[500px] w-auto object-contain drop-shadow-2xl rounded-2xl"
              />
            ) : (
              <div
                className="w-full max-w-md aspect-[3/4] rounded-2xl bg-white/20 flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="text-8xl">🍦</span>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      <FeaturesGrid />
      <PromoSections />
      {portobello?.portobelloHwd && <HwdSection data={portobello.portobelloHwd} />}
      <HowItWorks />
      <StatsSection />
      <CtaStrip title="Staňte sa partnerom fwip" buttonLabel={B2B.cta} />
    </>
  )
}
