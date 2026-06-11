import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV } from '../../data/static.sk'
import { stagger, fadeUp } from '../../design-system/animations'
import { useHeader } from '../../hooks/useHeader'
import { useMotionSafe } from '../../hooks/useMotionSafe'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { data: header } = useHeader()
  const staggerSafe = useMotionSafe(stagger)
  const fadeUpSafe = useMotionSafe(fadeUp)

  const logoUrl = header?.image?.url

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const solid = scrolled || menuOpen

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid ? 'backdrop-blur-md bg-dark/80 shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className="flex items-center transition-transform duration-200 hover:scale-105"
            aria-label="fwip – domov"
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={header?.image?.alternativeText || 'fwip'}
                /* White logo over teal/video heroes, teal logo on the scrolled dark bar */
                className={`h-10 md:h-12 w-auto object-contain transition-all duration-300 ${
                  solid ? '' : 'brightness-0 invert'
                }`}
              />
            ) : (
              <span className="font-display font-bold text-2xl md:text-3xl text-primary">
                fwip
              </span>
            )}
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV.links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-3 lg:px-4 py-2 text-sm lg:text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? solid
                        ? 'text-primary underline underline-offset-8 decoration-2 decoration-primary'
                        : 'text-white underline underline-offset-8 decoration-2 decoration-white'
                      : solid
                        ? 'text-white hover:text-primary'
                        : 'text-white/90 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {/* White CTA over teal/video heroes, teal CTA on the scrolled dark bar */}
            <NavLink
              to={NAV.cta.path}
              className={`ml-3 px-6 py-2.5 rounded-full font-semibold text-sm lg:text-base transition-colors duration-300 shadow-md ${
                solid
                  ? 'bg-primary text-dark hover:bg-primary-dark hover:text-white'
                  : 'bg-white text-dark hover:bg-dark hover:text-white'
              }`}
            >
              {NAV.cta.label}
            </NavLink>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Zavrieť menu' : 'Otvoriť menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`w-6 h-0.5 bg-white transition-transform duration-200 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-opacity duration-200 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-transform duration-200 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile slide-down menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="md:hidden overflow-hidden"
            >
              <motion.div
                variants={staggerSafe}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-1 pb-5"
              >
                {NAV.links.map((link) => (
                  <motion.div key={link.path} variants={fadeUpSafe}>
                    <NavLink
                      to={link.path}
                      end={link.path === '/'}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl font-medium ${
                          isActive
                            ? 'text-primary bg-white/10'
                            : 'text-white hover:bg-white/10'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
                <motion.div variants={fadeUpSafe}>
                  <NavLink
                    to={NAV.cta.path}
                    className="block mt-2 px-4 py-3 rounded-full bg-primary text-dark font-semibold text-center"
                  >
                    {NAV.cta.label}
                  </NavLink>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
