import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { fadeUp } from '../../design-system/animations'
import { useMotionSafe } from '../../hooks/useMotionSafe'
import { sentenceCase } from '../../lib/text'
import type { PortobelloHwd } from '../../types'
import Button from '../ui/Button'

/**
 * Machine dimensions section (portobelloHwd): height / depth / width options
 * with an interactive image switcher — "Malé rozmery, elegantný dizajn".
 */
export default function HwdSection({ data }: { data: PortobelloHwd }) {
  const fadeUpSafe = useMotionSafe(fadeUp)
  const options = (data.hwdOptions || []).filter((o) => o.text && o.image?.url)
  const [active, setActive] = useState(0)

  if (options.length === 0) return null
  const activeOption = options[Math.min(active, options.length - 1)]

  return (
    <section className="py-20 md:py-28 bg-primary-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Dimension switcher + image */}
        <motion.div
          variants={fadeUpSafe}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex items-center gap-6 md:gap-10"
        >
          <div className="flex flex-col gap-4 shrink-0" role="tablist" aria-label="Rozmery">
            {options.map((option, i) => (
              <button
                key={option.id}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`text-left font-display font-bold text-2xl md:text-4xl uppercase tracking-tight transition-all duration-300 ${
                  i === active
                    ? 'text-primary-dark scale-105'
                    : 'text-dark/30 hover:text-dark/60'
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>

          <div className="relative flex-1 h-[320px] md:h-[440px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeOption.id}
                src={activeOption.image!.url}
                alt={activeOption.text || 'Rozmery Portobello'}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="absolute inset-0 w-full h-full object-contain drop-shadow-xl"
              />
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Copy */}
        <motion.div
          variants={fadeUpSafe}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {data.textField1 && (
            <p className="text-primary-dark font-semibold tracking-[0.2em] uppercase text-xs md:text-sm">
              {data.textField1}
            </p>
          )}
          {data.textField2 && (
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-dark mt-3">
              {sentenceCase(data.textField2)}
            </h2>
          )}
          {data.textField3 && (
            <p className="text-muted text-base md:text-lg mt-6 leading-relaxed max-w-xl">
              {data.textField3}
            </p>
          )}
          <div className="mt-8">
            <Button to="/kontakt" size="lg">
              {data.button?.[0]?.text ? sentenceCase(data.button[0].text) : 'Kontaktujte nás'}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
