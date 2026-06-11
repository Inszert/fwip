import { motion } from 'framer-motion'
import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { CONTACT } from '../../data/static.sk'
import { fadeUp } from '../../design-system/animations'
import { useMotionSafe } from '../../hooks/useMotionSafe'
import { submitContactForm } from '../../lib/strapi'
import type { ContactFormData } from '../../types'
import Button from '../ui/Button'

const EMPTY_FORM: ContactFormData = {
  Business_name: '',
  Fname: '',
  Lname: '',
  emial: '',
  phone_number: '',
  postal_code: '',
  message: '',
}

const inputClass =
  'w-full bg-off-white border border-gray-200 rounded-2xl px-4 py-3 text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow'

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const variants = useMotionSafe(fadeUp)

  const set =
    (field: keyof ContactFormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)
    setError(null)

    const result = await submitContactForm(form)
    if (result.success) {
      setSuccess(CONTACT.form.success)
      setForm(EMPTY_FORM)
    } else {
      setError(result.error || CONTACT.form.error)
    }
    setLoading(false)
  }

  return (
    <motion.form
      variants={variants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-card p-6 sm:p-8 md:p-10 space-y-5"
      noValidate={false}
    >
      <div>
        <label htmlFor="business" className="block text-sm font-semibold text-dark mb-1.5">
          {CONTACT.form.businessName} *
        </label>
        <input
          id="business"
          type="text"
          required
          className={inputClass}
          value={form.Business_name}
          onChange={set('Business_name')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fname" className="block text-sm font-semibold text-dark mb-1.5">
            {CONTACT.form.firstName} *
          </label>
          <input
            id="fname"
            type="text"
            required
            className={inputClass}
            value={form.Fname}
            onChange={set('Fname')}
          />
        </div>
        <div>
          <label htmlFor="lname" className="block text-sm font-semibold text-dark mb-1.5">
            {CONTACT.form.lastName} *
          </label>
          <input
            id="lname"
            type="text"
            required
            className={inputClass}
            value={form.Lname}
            onChange={set('Lname')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-dark mb-1.5">
            {CONTACT.form.email} *
          </label>
          <input
            id="email"
            type="email"
            required
            className={inputClass}
            value={form.emial}
            onChange={set('emial')}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-dark mb-1.5">
            {CONTACT.form.phone}
          </label>
          <input
            id="phone"
            type="tel"
            className={inputClass}
            value={form.phone_number}
            onChange={set('phone_number')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-semibold text-dark mb-1.5">
          {CONTACT.form.city}
        </label>
        <input
          id="city"
          type="text"
          className={inputClass}
          value={form.postal_code}
          onChange={set('postal_code')}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-dark mb-1.5">
          {CONTACT.form.message}
        </label>
        <textarea
          id="message"
          rows={4}
          className={`${inputClass} resize-y`}
          value={form.message}
          onChange={set('message')}
        />
      </div>

      <p className="text-xs text-muted">{CONTACT.form.requiredHint}</p>

      <div className="pt-1">
        <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
          {loading ? CONTACT.form.submitting : CONTACT.form.submit}
        </Button>
      </div>

      <div aria-live="polite">
        {success && <p className="text-green-700 font-semibold">{success}</p>}
        {error && <p className="text-red-700 font-semibold">{error}</p>}
      </div>
    </motion.form>
  )
}
