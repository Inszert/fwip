import { FALLBACK_FLAVORS } from '../data/flavors.sk'
import { imageUrl } from '../lib/strapi'
import type { Flavor, FlavorType, Ingredient, StrapiIceCream } from '../types'
import { useStrapi } from './useStrapi'

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function inferType(name: string): FlavorType {
  const n = name.toLowerCase()
  if (n.includes('jogurt') || n.includes('froyo')) return 'Frozen Yogurt'
  if (n.includes('sorbet') || n.includes('mango') || n.includes('jahoda')) return 'Sorbet'
  return 'Gelato'
}

function firstSentence(text: string): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  const dot = clean.indexOf('.')
  return dot > 0 ? clean.slice(0, dot + 1) : clean
}

/** Live content mixes casing ("mango", "PISTÁCIA") — normalize to Title case. */
function displayName(name: string): string {
  const trimmed = name.trim()
  if (trimmed === trimmed.toUpperCase()) {
    const lower = trimmed.toLowerCase()
    return lower.charAt(0).toUpperCase() + lower.slice(1)
  }
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
}

function transform(items: StrapiIceCream[]): Flavor[] {
  return items.map((item) => {
    const type = inferType(item.name)

    const ingredients: Ingredient[] = (item.ingredient || [])
      .filter((ing) => ing.image?.url)
      .map((ing) => ({
        id: ing.id,
        url: imageUrl(ing.image),
        x: ing.x ?? 0,
        y: ing.y ?? 0,
        parallaxSpeed: ing.parallaxSpeed ?? 0.12,
        size: ing.size ?? 120,
        rotation: ing.rotation ?? 0,
      }))

    return {
      id: item.id,
      slug: slugify(item.name),
      name: displayName(item.name),
      type,
      tagline: firstSentence(item.description || ''),
      description: (item.description || '').trim(),
      isVegan: type === 'Sorbet',
      isGlutenFree: true,
      color: item.color || '#40DDCB',
      image: imageUrl(item.image) || undefined,
      ingredients,
    }
  })
}

/** Flavors (incl. floating ingredient images) from Strapi ice-creams. */
export function useProducts() {
  return useStrapi<StrapiIceCream, Flavor[]>(
    '/api/ice-creams?populate[image]=true&populate[ingredient][populate]=image',
    transform,
    FALLBACK_FLAVORS,
  )
}
