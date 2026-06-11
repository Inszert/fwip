import type { Flavor } from '../types'

/**
 * Hardcoded Slovak fallback flavors — used only when the Strapi API
 * is unreachable or returns no data. Mirrors the live ice-creams content.
 */
export const FALLBACK_FLAVORS: Flavor[] = [
  {
    id: 1,
    slug: 'cokolada',
    name: 'Čokoládové Gelato',
    type: 'Gelato',
    tagline: 'Tmavá čokoláda z pobreží západnej Afriky',
    description:
      'Krémové talianske gelato z jednopôvodnej tmavej čokolády. Hodvábne hladké a dokonale intenzívne.',
    isVegan: false,
    isGlutenFree: true,
    color: '#3D1C02',
  },
  {
    id: 2,
    slug: 'vanilka',
    name: 'Vanilkové Gelato',
    type: 'Gelato',
    tagline: 'Vanilkové struky z Tahiti',
    description:
      'Luxusná vanilka zo starostlivo vybraných strukov z Tahiti. Klasika, ktorá nikdy nevyjde z módy.',
    isVegan: false,
    isGlutenFree: true,
    color: '#F0D292',
  },
  {
    id: 3,
    slug: 'slany-karamel',
    name: 'Slaný Karamel Gelato',
    type: 'Gelato',
    tagline: 'Dokonalá rovnováha sladkosti a soli',
    description:
      'Karamelová dobrota s komplexnou slanou chuťou. Raz vyskúšaš, navždy si zamilovaný.',
    isVegan: false,
    isGlutenFree: true,
    color: '#C68B2F',
  },
  {
    id: 4,
    slug: 'pistacia',
    name: 'Pistáciové Gelato',
    type: 'Gelato',
    tagline: 'Slnečné Stredomorie v každej lyžičke',
    description:
      'Bohatá, krémová chuť starostlivo vybraných pistácií, ktorá vás prenesie priamo do slnečného Stredomoria.',
    isVegan: false,
    isGlutenFree: true,
    color: '#93C572',
  },
  {
    id: 5,
    slug: 'jahoda',
    name: 'Jahodový Sorbet',
    type: 'Sorbet',
    tagline: 'Čerstvé jahody z poľských polí',
    description:
      'Vegánsky sorbet plný šťavnatých jahôd. Osviežujúci, prirodzený, bez kompromisov.',
    isVegan: true,
    isGlutenFree: true,
    color: '#E8435A',
  },
  {
    id: 6,
    slug: 'mango',
    name: 'Mangový Sorbet',
    type: 'Sorbet',
    tagline: 'Alphonso mangá z tropickej Indie',
    description:
      'Exotický vegánsky sorbet s plnou ovocnou chuťou. Ako dovolenka v poháriku.',
    isVegan: true,
    isGlutenFree: true,
    color: '#F5A623',
  },
  {
    id: 7,
    slug: 'jogurt',
    name: 'Prírodný Frozen Jogurt',
    type: 'Frozen Yogurt',
    tagline: 'O 69 % menej tuku ako tradičná zmrzlina',
    description:
      'Ľahký a vzdušný mrazený jogurt. Nízky obsah tuku, plný probiotík. Zdravšia voľba.',
    isVegan: false,
    isGlutenFree: true,
    color: '#99D9EA',
  },
]
