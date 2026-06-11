import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import CookieConsent from './components/ui/CookieConsent'
import { pageTransition } from './design-system/animations'
import { useMotionSafe } from './hooks/useMotionSafe'
import ContactPage from './pages/ContactPage'
import FlavorDetailPage from './pages/FlavorDetailPage'
import HomePage from './pages/HomePage'
import MachinePage from './pages/MachinePage'
import NotFoundPage from './pages/NotFoundPage'
import PlacesPage from './pages/PlacesPage'
import PrivacyPage from './pages/PrivacyPage'
import ProductsPage from './pages/ProductsPage'
import ZariadeniaPage from './pages/ZariadeniaPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  const transition = useMotionSafe(pageTransition)

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={transition}
          initial="initial"
          animate="enter"
          exit="exit"
          className="flex-1"
        >
          {/* Routes mirror the original Next.js app/ directory */}
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/zmrzlina" element={<ProductsPage />} />
            <Route path="/zmrzlina/:slug" element={<FlavorDetailPage />} />
            <Route path="/portobello" element={<MachinePage />} />
            <Route path="/zariadenia" element={<ZariadeniaPage />} />
            <Route path="/places" element={<PlacesPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/ochrana-osobnych-udajov" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <CookieConsent />
      <Footer />
    </div>
  )
}
