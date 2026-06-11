import type { FlavorType } from '../../types'

type BadgeKind = 'vegan' | 'gluten-free' | 'less-fat' | 'type'

interface BadgeProps {
  kind: BadgeKind
  /** Required when kind === 'type' */
  flavorType?: FlavorType
}

const typeLabels: Record<FlavorType, string> = {
  Gelato: 'Gelato',
  Sorbet: 'Sorbet',
  'Frozen Yogurt': 'Frozen jogurt',
}

const typeStyles: Record<FlavorType, string> = {
  Gelato: 'bg-primary-light text-primary-dark',
  Sorbet: 'bg-orange-100 text-orange-700',
  'Frozen Yogurt': 'bg-sky-100 text-sky-700',
}

export default function Badge({ kind, flavorType }: BadgeProps) {
  const base =
    'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold tracking-wide'

  if (kind === 'type' && flavorType) {
    return <span className={`${base} ${typeStyles[flavorType]}`}>{typeLabels[flavorType]}</span>
  }
  if (kind === 'vegan') {
    return <span className={`${base} bg-green-100 text-green-700`}>🌱 Vegan</span>
  }
  if (kind === 'gluten-free') {
    return <span className={`${base} bg-amber-100 text-amber-700`}>Bezlepkové</span>
  }
  if (kind === 'less-fat') {
    return <span className={`${base} bg-sky-100 text-sky-700`}>Menej tuku</span>
  }
  return null
}
