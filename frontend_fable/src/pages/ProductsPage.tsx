import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import CtaStrip from '../components/sections/CtaStrip'
import SegmentedVideo from '../components/sections/SegmentedVideo'
import FlavorCard from '../components/ui/FlavorCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import SectionHeading from '../components/ui/SectionHeading'
import { FLAVORS_SECTION } from '../data/static.sk'
import { fadeUp, stagger } from '../design-system/animations'
import { useMotionSafe } from '../hooks/useMotionSafe'
import { useProducts } from '../hooks/useProducts'
import { useZmrzlinaVideo } from '../hooks/useZmrzlinaVideo'
import type { FlavorType } from '../types'

type Filter = 'all' | FlavorType

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Všetky' },
  { value: 'Gelato', label: 'Gelato' },
  { value: 'Sorbet', label: 'Sorbet' },
  { value: 'Frozen Yogurt', label: 'Frozen jogurt' },
]

export default function ProductsPage() {
  const { data: flavors, loading } = useProducts()
  const { data: videos } = useZmrzlinaVideo()
  const [filter, setFilter] = useState<Filter>('all')
  const staggerSafe = useMotionSafe(stagger)
  const fadeUpSafe = useMotionSafe(fadeUp)
  const prefersReduced = useReducedMotion()

  const filtered = filter === 'all' ? flavors : flavors.filter((f) => f.type === filter)

  return (
    <>
      {/* Video hero, like the original zmrzlina page — full screen, centered text */}
      {videos.heroVideoUrl ? (
        <section className="relative min-h-screen flex items-center justify-center bg-dark overflow-hidden">
          <video
            key={videos.heroVideoUrl}
            className="absolute inset-0 w-full h-full object-cover"
            src={videos.heroVideoUrl}
            autoPlay={!prefersReduced}
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-dark/35" aria-hidden="true" />
          <motion.div
            variants={fadeUpSafe}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg">
              {FLAVORS_SECTION.heading}
            </h1>
            <p className="font-accent italic text-xl md:text-2xl lg:text-3xl text-white/90 mt-6 drop-shadow">
              {FLAVORS_SECTION.subheading}
            </p>
          </motion.div>
        </section>
      ) : (
        <section className="bg-primary pt-32 pb-10 md:pt-40 md:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={FLAVORS_SECTION.heading}
              subtitle={FLAVORS_SECTION.subheading}
              align="left"
              light
            />
          </div>
        </section>
      )}

      <section className="py-16 md:py-20 bg-off-white min-h-[40vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div
            className="flex flex-wrap justify-center gap-3 mb-12"
            role="tablist"
            aria-label="Filter príchutí"
          >
            {FILTERS.map((f) => (
              <button
                key={f.value}
                role="tab"
                aria-selected={filter === f.value}
                onClick={() => setFilter(f.value)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  filter === f.value
                    ? 'bg-dark text-white shadow-md'
                    : 'bg-white text-muted shadow-card hover:text-dark hover:shadow-card-hover'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted py-12">
              V tejto kategórii momentálne nie sú žiadne príchute.
            </p>
          ) : (
            <motion.div
              key={filter}
              variants={staggerSafe}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filtered.map((flavor) => (
                <FlavorCard key={flavor.id} flavor={flavor} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* The "cut" video — 3 full-screen parts with text, like the original */}
      {videos.separVideoUrl && (
        <SegmentedVideo videoUrl={videos.separVideoUrl} segments={videos.segments} />
      )}

      <CtaStrip />
    </>
  )
}
