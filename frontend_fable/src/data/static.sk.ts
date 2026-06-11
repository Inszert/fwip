/**
 * Hardcoded Slovak copy for everything that does NOT live in Strapi,
 * plus fallbacks for sections whose Strapi content may be unavailable.
 */

export const HERO = {
  headline: 'Najmenšia gelatéria na svete',
  subheading: 'Ocenené talianske gelato, sorbet a frozen jogurt — čerstvo stočené za 7 sekúnd.',
  cta: 'Objavte naše príchute',
  ctaSecondary: 'Pre váš biznis',
}

export const HOW_IT_WORKS = {
  heading: 'Ako to funguje',
  subheading: 'Tri kroky k dokonalému gelatu — bez školenia, bez odpadu, bez čakania.',
  steps: [
    {
      title: 'Vyber',
      description: 'Vyberte si príchuť z hygienicky balených kapsúl — gelato, sorbet alebo frozen jogurt.',
    },
    {
      title: 'Vlož',
      description: 'Vložte kapsulu do stroja Portobello. Žiadna príprava, žiadne rozmrazovanie.',
    },
    {
      title: 'Stlač',
      description: 'Stlačte tlačidlo a za 7 sekúnd máte čerstvo stočené prémiové gelato.',
    },
  ],
}

export const MACHINE = {
  heading: 'Portobello',
  tagline: 'Najmenšia gelatéria na svete',
  description:
    'Ikonický stroj, ktorý premení každý kút vašej prevádzky na taliansku gelatériu. Kompaktný, elegantný a neuveriteľne jednoduchý na obsluhu.',
  cta: 'Spoznajte Portobello',
  features: [
    { title: 'Kompaktné rozmery', description: 'Zmestí sa na každý pult — potrebuje menej ako pol metra priestoru.' },
    { title: '7 sekúnd', description: 'Od kapsuly k hotovému dezertu za sedem sekúnd. Žiadne čakanie.' },
    { title: '3 štýly dezertov', description: 'Gelato, sorbet a frozen jogurt z jedného stroja.' },
    { title: 'Jednoduchá údržba', description: 'Hygienicky balené kapsuly znamenajú minimálne čistenie a nulový odpad.' },
  ],
  stats: [
    { value: '7 s', label: 'príprava porcie' },
    { value: '20+', label: 'krajín sveta' },
    { value: '1000+', label: 'prevádzok' },
    { value: '5×', label: 'ocenené receptúry' },
  ],
}

export const B2B = {
  heading: 'Pre váš biznis',
  description:
    'Kaviarne, reštaurácie, hotely aj bistrá — fwip zvýši vaše tržby a ponúkne hosťom nezabudnuteľný zážitok. Bez investície do mrazničiek, bez školenia personálu, bez odpadu.',
  cta: 'Staňte sa partnerom',
  points: [
    'Vysoká marža na každej porcii',
    'Žiadne náklady na skladovanie v mrazničke',
    'Konzistentná prémiová kvalita pri každom podaní',
  ],
}

export const FLAVORS_SECTION = {
  heading: 'Naše príchute',
  subheading: 'Ocenené receptúry z najkvalitnejších surovín — od tmavej čokolády z západnej Afriky po vanilku z Tahiti.',
  cta: 'Všetky príchute',
  detailCta: 'Zistiť viac',
}

export const CONTACT = {
  heading: 'Kontaktujte nás',
  subheading: 'Povedzte nám niečo o sebe — radi vám pripravíme ponuku na mieru.',
  phone: '+421 902 200 971',
  email: 'slovakia@fwip.com',
  address: 'PRENAKO s.r.o., Jedľová 3, 040 01 Košice',
  form: {
    businessName: 'Názov firmy',
    firstName: 'Meno',
    lastName: 'Priezvisko',
    email: 'E-mail',
    phone: 'Telefónne číslo',
    city: 'Mesto/Obec',
    message: 'Ako vám môžeme pomôcť?',
    submit: 'Odoslať',
    submitting: 'Odosielam…',
    success: 'Vaša správa bola úspešne odoslaná!',
    error: 'Správu sa nepodarilo odoslať. Skúste to prosím znova.',
    requiredHint: 'Polia označené * sú povinné.',
  },
}

export const NAV = {
  links: [
    { label: 'Domov', path: '/' },
    { label: 'Zmrzlina', path: '/zmrzlina' },
    { label: 'Portobello', path: '/portobello' },
    { label: 'Zariadenia', path: '/zariadenia' },
    { label: 'Vaša prevádzka', path: '/places' },
  ],
  cta: { label: 'Kontakt', path: '/kontakt' },
}

export const FOOTER = {
  tagline: 'Najmenšia gelatéria na svete — prémiové talianske gelato pre vašu prevádzku.',
  groups: [
    {
      title: 'Produkty',
      links: [
        { label: 'Zmrzlina', path: '/zmrzlina' },
        { label: 'Portobello', path: '/portobello' },
        { label: 'Zariadenia', path: '/zariadenia' },
      ],
    },
    {
      title: 'Pre biznis',
      links: [
        { label: 'Vaša prevádzka', path: '/places' },
        { label: 'Kontakt', path: '/kontakt' },
      ],
    },
  ],
  social: {
    instagram: 'https://www.instagram.com/fwip_slovakia',
    facebook: 'https://www.facebook.com/fwipslovakia.sk',
  },
  legal: { label: 'Ochrana osobných údajov', path: '/ochrana-osobnych-udajov' },
  copyright: `© ${new Date().getFullYear()} fwip Slovakia`,
}

export const ZARIADENIA = {
  heading: 'Zariadenia',
  subheading: 'Riešenia pre každú prevádzku',
  description:
    'Od kompaktného Portobella po riešenia pre veľké prevádzky. Jednoduché, efektívne a vždy s prémiovou kvalitou fwip.',
}

export const PLACES = {
  heading: 'FWIP PRE VAŠU PREVÁDZKU',
  subheading: 'Kaviarne, reštaurácie, hotely a ďalšie prevádzky — zvýšte príjmy a ponúknite hosťom nezabudnuteľný zážitok.',
  sections: [
    {
      title: 'Kaviarne',
      headline: 'Dezert, ktorý sa predáva sám',
      description: 'Doplňte ponuku kávy o prémiové gelato. Rýchla príprava, žiadny odpad, nadšení zákazníci.',
    },
    {
      title: 'Reštaurácie',
      headline: 'Dokonalá bodka za každým menu',
      description: 'Servírujte talianske gelato bez cukrára v kuchyni. Konzistentná kvalita pri každom podaní.',
    },
    {
      title: 'Hotely',
      headline: 'Prémiový zážitok pre hostí',
      description: 'Od raňajkového bufetu po room service — fwip povýši váš servis na novú úroveň.',
    },
  ],
}

export const NOT_FOUND = {
  heading: 'Stránka sa nenašla',
  description: 'Ups — táto stránka sa roztopila. Skúste sa vrátiť na domovskú stránku.',
  cta: 'Späť domov',
}

export const COMPARISON_FALLBACK = {
  heading: 'Prečo fwip?',
  subheading: 'Porovnajte sami — fwip vs. tradičná kopčeková zmrzlina',
  cta: 'Chcem fwip pre môj biznis',
  columns: ['fwip', 'Kopčeková zmrzlina'],
  rows: [
    { label: 'Príprava porcie', values: ['7 sekúnd', '2–3 minúty'] },
    { label: 'Odpad', values: ['Žiadny', 'Vysoký'] },
    { label: 'Školenie personálu', values: ['Nepotrebné', 'Potrebné'] },
    { label: 'Hygiena', values: ['Uzavreté kapsuly', 'Otvorené vane'] },
    { label: 'Priestor', values: ['< 0,5 m pultu', 'Veľká vitrína'] },
  ],
}
