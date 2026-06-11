import { motion } from 'framer-motion'
import { COMPARISON_FALLBACK } from '../../data/static.sk'
import { fadeUp } from '../../design-system/animations'
import { useComparisons } from '../../hooks/useComparisons'
import { useHeader } from '../../hooks/useHeader'
import { useMotionSafe } from '../../hooks/useMotionSafe'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'

/** Cell value: Strapi gives booleans (✓/✕), the static fallback gives strings. */
type CellValue = boolean | string | null

function Cell({ value, highlight }: { value: CellValue; highlight: boolean }) {
  if (typeof value === 'string') {
    return (
      <span className={highlight ? 'font-semibold text-primary-dark' : 'text-muted'}>
        {value}
      </span>
    )
  }
  if (value === null || value === undefined) {
    return (
      <span className="text-muted" aria-label="neuvedené">
        –
      </span>
    )
  }
  return value ? (
    <span
      className={`inline-flex w-7 h-7 items-center justify-center rounded-full ${
        highlight ? 'bg-primary text-dark' : 'bg-primary-light text-primary-dark'
      }`}
      aria-label="áno"
    >
      ✓
    </span>
  ) : (
    <span
      className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-gray-100 text-muted"
      aria-label="nie"
    >
      ✕
    </span>
  )
}

/**
 * "Ako obstál fwip v porovnaní" table. Columns come from the Strapi
 * comparisons collection (`types`, fwip last with image only); each row is a
 * `property` with one boolean result per column. Static Slovak fallback
 * otherwise.
 */
export default function ComparisonSection() {
  const { data: comparison } = useComparisons()
  const { data: header } = useHeader()
  const variants = useMotionSafe(fadeUp)
  const fwipLogo = header?.image?.url

  const heading = comparison?.text1 || COMPARISON_FALLBACK.heading
  const subheading = comparison?.text2 || COMPARISON_FALLBACK.subheading
  const ctaText = comparison?.button?.text || COMPARISON_FALLBACK.cta

  const hasStrapiData =
    !!comparison?.types?.length && !!comparison?.property?.length

  const columns: { label: string; imageUrl?: string; isFwip: boolean }[] = hasStrapiData
    ? comparison!.types!.map((t, i, all) => ({
        label: t.name || 'fwip',
        imageUrl: t.image?.[0]?.url,
        // The fwip column has no name in CMS data and is the last column
        isFwip: !t.name || i === all.length - 1,
      }))
    : COMPARISON_FALLBACK.columns.map((label, i) => ({ label, isFwip: i === 0 }))

  const rows: { label: string; values: CellValue[] }[] = hasStrapiData
    ? comparison!.property!.map((p) => ({
        label: p.property,
        values: (p.result || []).map((r) => r.result),
      }))
    : COMPARISON_FALLBACK.rows.map((r) => ({ label: r.label, values: [...r.values] }))

  return (
    <section className="py-20 md:py-28 bg-off-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={heading} subtitle={subheading} />

        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="bg-white rounded-2xl shadow-card overflow-hidden overflow-x-auto"
        >
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="bg-dark text-white">
                <th className="text-left px-4 md:px-5 py-4 font-semibold" scope="col">
                  <span className="sr-only">Vlastnosť</span>
                </th>
                {columns.map((col, i) => (
                  <th
                    key={`${col.label}-${i}`}
                    scope="col"
                    className={`px-3 md:px-5 py-4 text-center align-middle ${
                      col.isFwip ? 'text-primary' : 'text-white/85'
                    }`}
                  >
                    {col.isFwip ? (
                      /* fwip column: logo instead of the word */
                      (col.imageUrl || fwipLogo) ? (
                        <img
                          src={col.imageUrl || fwipLogo}
                          alt="fwip"
                          loading="lazy"
                          className="h-9 md:h-11 mx-auto object-contain brightness-0 invert"
                        />
                      ) : (
                        <span className="font-display font-bold text-sm md:text-base">fwip</span>
                      )
                    ) : (
                      <>
                        {col.imageUrl && (
                          <img
                            src={col.imageUrl}
                            alt=""
                            loading="lazy"
                            className="w-10 h-10 mx-auto mb-1.5 object-contain rounded-full bg-white/10"
                          />
                        )}
                        <span className="font-display font-bold text-xs md:text-sm leading-tight block">
                          {col.label}
                        </span>
                      </>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={row.label || ri} className={ri % 2 === 0 ? 'bg-off-white/60' : ''}>
                  <th
                    scope="row"
                    className="text-left px-4 md:px-5 py-3.5 font-medium text-dark"
                  >
                    {row.label}
                  </th>
                  {columns.map((col, ci) => (
                    <td key={ci} className="px-3 md:px-5 py-3.5 text-center">
                      <Cell value={row.values[ci] ?? null} highlight={col.isFwip} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <div className="text-center mt-10">
          <Button to="/kontakt" size="lg">
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  )
}
