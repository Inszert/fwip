import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { initAnalytics } from '../../lib/analytics'

const STORAGE_KEY = 'simpleCookieConsent'

/** Cookie consent bar — shows once on the home page until accepted. */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname !== '/') return
    if (localStorage.getItem(STORAGE_KEY)) return
    const timer = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [pathname])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
    initAnalytics()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-[60]"
          role="dialog"
          aria-label="Súhlas s cookies"
        >
          <div className="bg-white rounded-2xl shadow-card-hover border border-gray-100 max-w-lg mx-auto md:mx-0 p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <span
                className="shrink-0 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-lg"
                aria-hidden="true"
              >
                🍪
              </span>
              <p className="text-sm text-text">
                <span className="font-semibold">Naša stránka používa súbory cookies.</span>{' '}
                <Link
                  to="/ochrana-osobnych-udajov"
                  className="text-primary-dark hover:text-primary font-medium underline underline-offset-2 transition-colors"
                >
                  Viac informácií
                </Link>
              </p>
            </div>
            <button
              onClick={accept}
              className="shrink-0 bg-primary hover:bg-primary-dark hover:text-white text-dark px-5 py-2 rounded-full font-semibold transition-colors active:scale-95"
            >
              OK
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
