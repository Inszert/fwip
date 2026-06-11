import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import { NOT_FOUND } from '../data/static.sk'
import { fadeUp } from '../design-system/animations'
import { useMotionSafe } from '../hooks/useMotionSafe'

export default function NotFoundPage() {
  const variants = useMotionSafe(fadeUp)

  return (
    <section className="min-h-screen flex items-center justify-center bg-dark px-4">
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-lg"
      >
        <p className="font-display text-8xl font-bold text-primary" aria-hidden="true">
          404
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mt-4">
          {NOT_FOUND.heading}
        </h1>
        <p className="text-white/70 mt-4 text-lg">{NOT_FOUND.description}</p>
        <div className="mt-8">
          <Button to="/" size="lg">
            {NOT_FOUND.cta}
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
