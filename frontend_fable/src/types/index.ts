/**
 * TypeScript types matching the Strapi schemas found in backend_strapi/src/api.
 * Field names intentionally mirror Strapi (including the `emial` typo in
 * contact-formular and `stepss` plural) so payloads map 1:1.
 */

// ---------- Shared ----------

export interface StrapiImage {
  id?: number
  url: string
  alternativeText?: string | null
  width?: number
  height?: number
  formats?: {
    large?: { url: string }
    medium?: { url: string }
    small?: { url: string }
    thumbnail?: { url: string }
  }
}

export interface StrapiButton {
  id?: number
  text: string
  url: string | null
  color?: string
}

export interface RichTextChild {
  type: string
  text: string
}

export interface RichTextBlock {
  type: string
  children: RichTextChild[]
}

export interface StrapiListResponse<T> {
  data: T[]
  meta?: {
    pagination?: { page: number; pageSize: number; pageCount: number; total: number }
  }
}

// ---------- Domain: flavors (api::ice-cream) ----------

export type FlavorType = 'Gelato' | 'Sorbet' | 'Frozen Yogurt'

/** Floating ingredient image positioned around a flavor (default.ingredient component) */
export interface Ingredient {
  id: number
  url: string
  x: number
  y: number
  parallaxSpeed: number
  size: number
  rotation: number
}

/** App-level flavor model, normalized from Strapi ice-creams */
export interface Flavor {
  id: number
  slug: string
  name: string
  type: FlavorType
  tagline: string
  description: string
  isVegan: boolean
  isGlutenFree: boolean
  /** CSS color (hex or named) used for card chips and detail hero */
  color: string
  image?: string
  ingredients?: Ingredient[]
}

export interface StrapiIngredient {
  id: number
  x?: number | null
  y?: number | null
  parallaxSpeed?: number | null
  size?: number | null
  rotation?: number | null
  image?: StrapiImage | null
}

export interface StrapiIceCream {
  id: number
  name: string
  description: string
  color: string
  image?: StrapiImage | null
  ingredient?: StrapiIngredient[]
}

// ---------- api::steps (collection "stepss") ----------

export interface StrapiStep {
  id: number
  text1: string | null
  text2: string | null
  video?: { id: number; video?: StrapiImage | null; text?: string | null }[]
}

export interface Step {
  label: string
  description?: string
  videoUrl?: string
}

export interface StepsContent {
  heading: string
  subheading: string
  steps: Step[]
}

// ---------- api::hero-video ----------

export interface StrapiHeroVideo {
  id: number
  title?: string | null
  textField1?: string | null
  textField2?: string | null
  textField3?: string | null
  video?: StrapiImage | null
}

export interface HeroVideoContent {
  headline: string | null
  videoUrl: string | null
}

// ---------- api::hero-video-ice-cream ----------

export interface VideoSegment {
  start_time: number
  end_time: number
  text1: string | null
  text2: string | null
  side: 'left' | 'right' | string | null
}

export interface StrapiHeroVideoIceCream {
  id: number
  video?: StrapiImage[]
  main_body_video?: {
    video_separ?: StrapiImage | null
    data_for_sep?: {
      start_time: string | number
      end_time: string | number
      text1?: string | null
      text2?: string | null
      side?: string | null
    }[]
  } | null
}

export interface ZmrzlinaVideoContent {
  heroVideoUrl: string | null
  separVideoUrl: string | null
  segments: VideoSegment[]
}

// ---------- api::header ----------

export interface StrapiHeader {
  id: number
  subtitle?: string | null
  button?: StrapiButton[]
  image?: StrapiImage | null
}

// ---------- api::comparison ----------

export interface ComparisonType {
  id: number
  /** Column label; null for the fwip column (image only) */
  name: string | null
  image?: StrapiImage[] | null
}

export interface ComparisonProperty {
  id: number
  property: string
  result?: { id: number; result: boolean | null }[]
}

export interface StrapiComparison {
  id: number
  text1?: string | null
  text2?: string | null
  button?: StrapiButton | null
  types?: ComparisonType[]
  property?: ComparisonProperty[]
}

// ---------- api::portobello ----------

export interface PortobelloPrimary {
  textField1?: string | null
  textField2?: string | null
  textField3?: string | null
  image?: StrapiImage | null
}

export interface ImageTextCombo {
  text?: string | null
  image?: StrapiImage | null
}

export interface PortobelloSecondary {
  subtitle?: string | null
  imageTextCombo?: ImageTextCombo[]
}

export interface HwdOption {
  id: number
  text: string | null
  orientacion?: string | null
  image?: StrapiImage | null
}

export interface PortobelloHwd {
  id: number
  textField1?: string | null
  textField2?: string | null
  textField3?: string | null
  button?: StrapiButton[]
  color?: string
  hwdOptions?: HwdOption[]
}

export interface StrapiPortobello {
  id: number
  portobelloPrimary?: PortobelloPrimary | null
  portobelloSecondary?: PortobelloSecondary | null
  portobelloHwd?: PortobelloHwd | null
}

// ---------- api::promo-section ----------

export interface StrapiPromoSection {
  id: number
  backgroundColor?: string | null
  imagePosition?: 'left' | 'right' | null
  textPosition?: 'left' | 'right' | null
  row1?: string | null
  row2?: string | null
  row2Color?: string | null
  row3?: string | null
  image?: StrapiImage | null
}

// ---------- api::zariadenia ----------

export interface ZariadeniaUnit {
  id: number
  text1?: string | null
  text2?: string | null
  text3?: string | null
  image?: StrapiImage | null
  button?: StrapiButton | StrapiButton[] | null
}

export interface StrapiZariadenia {
  id: number
  text1?: string | null
  text2?: string | null
  text3?: string | null
  main_image?: StrapiImage[]
  units_part?: ZariadeniaUnit[]
}

// ---------- api::place ----------

export interface PlaceHeroSection {
  id: number
  text1?: string | null
  text2?: string | null
  text3?: string | null
  bg_color?: string | null
  text1_color?: string | null
  text2_color?: string | null
  text3_color?: string | null
  image?: StrapiImage[]
}

export interface StrapiPlace {
  id: number
  landing_text1?: string | null
  lending_text2?: string | null
  lending_image?: StrapiImage | null
  first_hero_section?: PlaceHeroSection[]
}

// ---------- api::footer ----------

export interface FooterOptionalSlot {
  id: number
  Title: string
  description?: RichTextBlock[]
  url?: string | null
}

export interface StrapiFooter {
  id: number
  phoneNumber?: string | null
  location?: string | null
  footer_opt?: FooterOptionalSlot[]
  footer_btns?: StrapiButton[]
}

// ---------- api::contact-formular ----------

/** Field names must match the Strapi schema exactly (incl. `emial`). */
export interface ContactFormData {
  Business_name: string
  Fname: string
  Lname: string
  emial: string
  phone_number: string
  postal_code: string
  message: string
}
