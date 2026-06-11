# fwip.sk — frontend_fable

## What this is
Redesigned Slovak frontend for fwip.sk. Vite + React 18 + TypeScript + Tailwind CSS v3
+ Framer Motion. Built with Claude Fable 5.

IMPORTANT: This folder is completely independent from ../frontend/
Never touch any file outside frontend_fable/

## Model
Built with: claude-fable-5
Run with: claude --model claude-fable-5 --dangerously-skip-permissions

## Stack
- Vite 5 (port 5174)
- React 18
- TypeScript
- Tailwind CSS v3 — all tokens in tailwind.config.ts
- Framer Motion — all variants in src/design-system/animations.ts
- React Router v6

## Routes (mirrors the original Next.js app/ directory)
| Route | Page |
|---|---|
| `/` | HomePage |
| `/zmrzlina` | ProductsPage (flavors + filter tabs) |
| `/zmrzlina/:slug` | FlavorDetailPage |
| `/portobello` | MachinePage |
| `/zariadenia` | ZariadeniaPage (equipment) |
| `/places` | PlacesPage (B2B / vaša prevádzka) |
| `/kontakt` | ContactPage |
| `/ochrana-osobnych-udajov` | PrivacyPage |

## Design tokens
Primary teal:    #40DDCB  → bg-primary / text-primary
Primary dark:    #2BB8A8  → bg-primary-dark
Primary light:   #E8FAF8  → bg-primary-light
Dark:            #1A1A2E  → bg-dark
Headings font:   Playfair Display → font-display
Body font:       Inter → font-sans
Accent font:     Cormorant Garamond → font-accent
Never use raw hex in components — always use Tailwind token classes.
(Exception: CMS-managed colors like flavor.color or promo backgroundColor
are data, applied via inline style.)

## Data sources
- Strapi API: VITE_STRAPI_URL in .env (production Railway instance; default http://localhost:1337)
- Media URLs from the private Cloudflare R2 bucket are rewritten to the public
  r2.dev host in src/lib/strapi.ts (same mapping as the original frontend).
- All Strapi collection types: see src/hooks/ — one hook per collection:
  - useProducts → /api/ice-creams (Flavor model incl. floating ingredients)
  - useSteps → /api/stepss (heading + circular step videos)
  - useComparisons → /api/comparisons
  - usePortobello → /api/portobellos (primary + secondary + hwd components)
  - usePromoSections → /api/promo-sections
  - useZariadenia → /api/zariadenias
  - usePlaces → /api/places (also provides B2B image + section colors)
  - useFooter → /api/footers
  - useHeader → /api/headers (fwip logo used in navbar, footer, comparison)
  - useHeroVideo → /api/hero-videos (home hero background video)
  - useZmrzlinaVideo → /api/hero-video-ice-creams (zmrzlina hero + segmented video)
- SEO: usePageMeta hook sets per-page title/description/OG/canonical
  (PAGE_META in src/hooks/usePageMeta.ts); JSON-LD Organization in index.html;
  public/robots.txt ready. Sitemap intentionally NOT generated yet.
- Contact form POSTs to /api/contact-formulars — field names match the Strapi
  schema exactly, including the `emial` typo. Do not "fix" it client-side.
- Fallback hardcoded Slovak data: src/data/flavors.sk.ts + src/data/static.sk.ts
  Every hook falls back to it on API failure or empty response (isFallback flag).
- All user-facing text: SLOVAK language only

## Sub-agents

### design-agent
Owns: src/components/ui/**, tailwind.config.ts, src/design-system/tokens.ts
Rules: Mobile-first. No raw hex. No UI libraries. Tailwind only.

### animation-agent
Owns: src/design-system/animations.ts, Framer Motion usage in all components
Rules: All scroll-triggered with useInView. Respect prefers-reduced-motion
       (every motion component sources variants via useMotionSafe()).
       No autoplay animations that cause layout shift.

### content-agent
Owns: src/data/**, all page copy
Rules: All text in Slovak. Brand voice: premium, playful, Italian heritage.
       Match fwip.com tone but in Slovak.

### api-agent
Owns: src/hooks/**, src/lib/strapi.ts
Rules: Always fall back to hardcoded data on API failure.
       Use VITE_STRAPI_URL. Match endpoint patterns from ../frontend/ audit.

### layout-agent
Owns: src/pages/**, src/components/layout/**
Rules: Same routes as found in ../frontend/ audit.
       AnimatePresence on all page transitions.

## Dev commands
cd frontend_fable
npm install
npm run dev        → http://localhost:5174
npm run build
npm run preview

## Permissions
WRITE:     frontend_fable/** (full, unrestricted)
READ-ONLY: frontend/**, backend/**, backend_strapi/**
FORBIDDEN: Any write outside frontend_fable/
FORBIDDEN: git push, git commit, git add — no git operations
