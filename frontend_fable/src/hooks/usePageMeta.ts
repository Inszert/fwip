import { useEffect } from 'react'

interface PageMeta {
  title: string
  description: string
}

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.content = content
}

/**
 * Per-page <title>, description and Open Graph tags for SEO (Google Search
 * Console readiness). SPA equivalent of the per-page metadata the original
 * Next.js app had.
 */
export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    document.title = title
    setMetaTag('name', 'description', description)
    setMetaTag('name', 'robots', 'index, follow')
    setMetaTag('property', 'og:title', title)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:type', 'website')
    setMetaTag('property', 'og:url', `https://fwip.sk${window.location.pathname}`)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `https://fwip.sk${window.location.pathname}`
  }, [title, description])
}

/** Slovak meta texts per route, carried over from the original frontend. */
export const PAGE_META = {
  home: {
    title: 'FWIP – prémiová gelato zmrzlina a zariadenia pre prevádzky | fwip.sk',
    description:
      'FWIP.sk ponúka prémiovú taliansku gelato zmrzlinu – kapsulovo hygienicky balenú, oceňované receptúry, Portobello stroje a zariadenia pre kaviarne, reštaurácie a hotely.',
  },
  zmrzlina: {
    title: 'FWIP Zmrzlina – naše príchute | fwip.sk',
    description:
      'FWIP.sk ponúka prémiovú zmrzlinu pre kaviarne, reštaurácie a ďalšie prevádzky. Objavte signature recepty a kvalitné ingrediencie.',
  },
  portobello: {
    title: 'FWIP Portobello – najmenšia gelatéria na svete | fwip.sk',
    description:
      'FWIP Portobello – ikonický stroj pre kaviarne a reštaurácie, ktorý umožňuje rýchle a kvalitné podávanie dezertov. Zvýšte príjmy a rozšírte menu jednoducho.',
  },
  zariadenia: {
    title: 'FWIP Zariadenia | fwip.sk',
    description:
      'FWIP.sk ponúka zariadenia na výrobu prémiovej zmrzliny pre kaviarne, reštaurácie a ďalšie prevádzky. Jednoduché, efektívne a kvalitné riešenia.',
  },
  places: {
    title: 'FWIP pre kaviarne a reštaurácie | fwip.sk',
    description:
      'FWIP.sk ponúka prémiové zmrzliny pre kaviarne, reštaurácie, hotely a ďalšie prevádzky. Zvýšte príjmy a ponúknite nezabudnuteľný zážitok zákazníkom.',
  },
  kontakt: {
    title: 'Kontaktujte FWIP | fwip.sk',
    description:
      'Kontaktujte FWIP.sk pre otázky, spoluprácu alebo ponuky. Vyplňte náš formulár a radi vám odpovieme.',
  },
  privacy: {
    title: 'Ochrana osobných údajov | fwip.sk',
    description: 'Zásady spracúvania osobných údajov a informácie pre dotknutú osobu – fwip.sk.',
  },
} as const
