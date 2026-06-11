import { motion } from 'framer-motion'
import ContactForm from '../components/sections/ContactForm'
import { CONTACT, FOOTER } from '../data/static.sk'
import { fadeUp, slideInLeft } from '../design-system/animations'
import { useMotionSafe } from '../hooks/useMotionSafe'
import { PAGE_META, usePageMeta } from '../hooks/usePageMeta'
import { useFooter } from '../hooks/useFooter'

export default function ContactPage() {
  usePageMeta(PAGE_META.kontakt)
  const fadeUpSafe = useMotionSafe(fadeUp)
  const left = useMotionSafe(slideInLeft)
  const { data: strapiFooter } = useFooter()

  const phone = strapiFooter?.phoneNumber || CONTACT.phone
  const address = strapiFooter?.location || CONTACT.address

  return (
    <>
      <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-20">
        <motion.div
          variants={fadeUpSafe}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            {CONTACT.heading}
          </h1>
          <p className="font-accent italic text-xl md:text-2xl text-dark/80 mt-5 max-w-2xl mx-auto">
            {CONTACT.subheading}
          </p>
        </motion.div>
      </section>

      <section className="py-16 md:py-24 bg-off-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info block */}
          <motion.aside
            variants={left}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-card p-7">
              <h2 className="font-display text-xl font-bold text-dark mb-5">
                Kontaktné údaje
              </h2>
              <ul className="space-y-4 text-sm md:text-base">
                <li>
                  <span className="block text-xs uppercase tracking-wider text-muted mb-1">
                    Telefón
                  </span>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="font-semibold text-primary-dark hover:text-primary transition-colors"
                  >
                    {phone}
                  </a>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wider text-muted mb-1">
                    E-mail
                  </span>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="font-semibold text-primary-dark hover:text-primary transition-colors"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wider text-muted mb-1">
                    Adresa
                  </span>
                  <span className="text-text">{address}</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary rounded-2xl shadow-card p-7">
              <h2 className="font-display text-xl font-bold text-dark mb-3">Sledujte nás</h2>
              <div className="flex gap-4">
                <a
                  href={FOOTER.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-dark hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={FOOTER.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-dark hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </motion.aside>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
