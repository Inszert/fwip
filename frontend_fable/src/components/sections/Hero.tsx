import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { HERO } from '../../data/static.sk'
import { fadeUp, wordReveal } from '../../design-system/animations'
import { useHeroVideo } from '../../hooks/useHeroVideo'
import { useMotionSafe } from '../../hooks/useMotionSafe'
import Button from '../ui/Button'

/** Hide the text overlay after this long without interaction, so the video can shine. */
const OVERLAY_IDLE_MS = 7000

export default function Hero() {
  const { data: heroVideo } = useHeroVideo()
  const prefersReduced = useReducedMotion()
  const fadeUpSafe = useMotionSafe(fadeUp)
  const [overlayVisible, setOverlayVisible] = useState(true)
  const idleTimer = useRef<number | undefined>(undefined)

  const headline = heroVideo.headline || HERO.headline
  const words = headline.split(' ')
  const hasVideo = !!heroVideo.videoUrl

  // Fade the overlay out after a while so long watchers see the video;
  // any pointer activity brings it back. Skipped without video / reduced motion.
  const restartIdleTimer = useCallback(() => {
    setOverlayVisible(true)
    window.clearTimeout(idleTimer.current)
    if (!hasVideo || prefersReduced) return
    idleTimer.current = window.setTimeout(() => setOverlayVisible(false), OVERLAY_IDLE_MS)
  }, [hasVideo, prefersReduced])

  useEffect(() => {
    restartIdleTimer()
    return () => window.clearTimeout(idleTimer.current)
  }, [restartIdleTimer])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-dark overflow-hidden"
      onMouseMove={restartIdleTimer}
      onTouchStart={restartIdleTimer}
    >
      {/* Strapi background video (the one from the original landing page) */}
      {hasVideo && (
        <video
          key={heroVideo.videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          src={heroVideo.videoUrl!}
          autoPlay={!prefersReduced}
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}
      {/* Readability overlay — fades away together with the text */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          hasVideo
            ? `bg-gradient-to-t from-dark/70 via-dark/30 to-dark/40 ${
                overlayVisible ? 'opacity-100' : 'opacity-0'
              }`
            : 'bg-dark'
        }`}
        aria-hidden="true"
      />
      {!hasVideo && (
        <>
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary opacity-10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-40 -right-24 w-[28rem] h-[28rem] rounded-full bg-primary opacity-10 blur-3xl"
            aria-hidden="true"
          />
        </>
      )}

      <div
        className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32 transition-opacity duration-1000 ${
          overlayVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <motion.p
          variants={fadeUpSafe}
          initial="hidden"
          animate="visible"
          className="text-primary font-semibold tracking-[0.25em] uppercase text-xs md:text-sm mb-6"
        >
          Prémiové talianske gelato
        </motion.p>

        {/* Word-by-word headline reveal (real spaces kept between words) */}
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight drop-shadow-lg">
          {words.map((word, i) => (
            <span key={`${word}-${i}`} className="whitespace-pre">
              <motion.span
                custom={i}
                variants={prefersReduced ? undefined : wordReveal}
                initial={prefersReduced ? undefined : 'hidden'}
                animate={prefersReduced ? undefined : 'visible'}
                className="inline-block"
              >
                {word}
              </motion.span>
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>

        <motion.p
          variants={fadeUpSafe}
          initial="hidden"
          animate="visible"
          transition={{ delay: words.length * 0.08 + 0.2 }}
          className="font-accent italic text-xl md:text-2xl lg:text-3xl text-white/90 mt-6 max-w-2xl mx-auto drop-shadow"
        >
          {HERO.subheading}
        </motion.p>

        <motion.div
          variants={fadeUpSafe}
          initial="hidden"
          animate="visible"
          transition={{ delay: words.length * 0.08 + 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button to="/zmrzlina" size="lg">
            {HERO.cta}
          </Button>
          <Button to="/places" variant="outline" size="lg" className="backdrop-blur-sm">
            {HERO.ctaSecondary}
          </Button>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
        aria-hidden="true"
      >
        <motion.div
          animate={prefersReduced ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1.5"
        >
          <span className="w-1 h-2.5 rounded-full bg-current" />
        </motion.div>
      </motion.div>
    </section>
  )
}
