import { motion, useReducedMotion } from 'framer-motion'
import { stagger, scaleIn } from '../../design-system/animations'
import { useMotionSafe } from '../../hooks/useMotionSafe'
import { useSteps } from '../../hooks/useSteps'
import SectionHeading from '../ui/SectionHeading'

/**
 * Wide "Jednoducho v troch krokoch" strip with circular autoplay videos
 * from the Strapi stepss collection (Vyber / Vlož / Stlač / Vychutnaj).
 */
export default function HowItWorks() {
  const { data } = useSteps()
  const staggerSafe = useMotionSafe(stagger)
  const scaleInSafe = useMotionSafe(scaleIn)
  const prefersReduced = useReducedMotion()

  return (
    <section className="py-20 md:py-28 bg-primary-light overflow-hidden">
      {/* Full-width container — the steps strip runs nearly edge to edge */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeading title={data.heading} subtitle={data.subheading} />

        <motion.ol
          variants={staggerSafe}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-12 lg:gap-x-14"
        >
          {data.steps.map((step, i) => (
            <motion.li
              key={step.label || i}
              variants={scaleInSafe}
              className="flex flex-col items-center text-center w-44 sm:w-52 lg:w-64"
            >
              <div className="relative">
                {step.videoUrl ? (
                  <video
                    className="w-40 h-40 sm:w-48 sm:h-48 lg:w-60 lg:h-60 rounded-full object-cover ring-4 ring-white shadow-card"
                    src={step.videoUrl}
                    autoPlay={!prefersReduced}
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                  />
                ) : (
                  <div
                    className="w-40 h-40 sm:w-48 sm:h-48 lg:w-60 lg:h-60 rounded-full bg-white ring-4 ring-white shadow-card flex items-center justify-center text-5xl"
                    aria-hidden="true"
                  >
                    🍦
                  </div>
                )}
                <span className="absolute -top-1 -left-1 w-10 h-10 rounded-full bg-primary text-dark font-bold flex items-center justify-center shadow-md ring-2 ring-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display text-xl lg:text-2xl font-bold text-dark mt-5">
                {step.label}
              </h3>
              {step.description && (
                <p className="text-muted text-sm mt-2 leading-relaxed">{step.description}</p>
              )}
            </motion.li>
          ))}
        </motion.ol>

        <p className="text-center font-accent italic text-2xl text-primary-dark mt-14">
          Hotovo za 7 sekúnd!
        </p>
      </div>
    </section>
  )
}
