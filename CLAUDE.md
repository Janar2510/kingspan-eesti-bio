# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev            # dev server at http://127.0.0.1:5173
npm run build          # tsc + vite build → dist/
npm run build:static   # build + puppeteer prerender (needs: npm i -D puppeteer)
npm run preview        # serve dist/ locally

# Asset generation — run after adding/removing files, then commit output
npm run gen:images     # writes manifest.json into each public/images/{product}/ folder
npm run gen:downloads  # scans public/downloads/ → updates src/data/downloads.json
npm run gen:sitemap    # regenerate dist/sitemap.xml (SITE_URL env var optional)
npm run gen:doc        # generate a single PDF (see script for args)
npm run gen:samples    # generate sample invoice, proposal, order PDFs into docs/
```

No test runner is configured.

## Architecture

### Routing — manual, no React Router

`src/main.tsx` inspects `window.location.pathname` at boot and renders one of:
- `App` (homepage, `src/App.tsx`)
- `About`, `Calculator`, `Hajaasustus`, `PrivacyPolicy` (in `src/pages/`)

There is no client-side navigation library. Page links are plain `<a href="...">`. Netlify's `[[redirects]]` serves `index.html` for all paths so React can handle them.

### i18n

All user-visible strings live in `src/utils/locales/ee.json` (Estonian, default) and `en.json` (English). Loaded by `src/utils/i18n.ts` via `i18next` + `react-i18next`. Always use the `t('key')` hook — never hardcode Estonian or English copy in JSX.

### Brand design tokens — single source of truth

`src/brand/tokens.js` is the **only** place brand values are defined. It is consumed by:
- `tailwind.config.js` — extends Tailwind with brand colors, typography scale, spacing, radius, shadows, animations
- `src/styles.css` — CSS custom properties (`:root { --c-blue-700: ... }`) and semantic utility classes
- `src/documents/theme.js` — `@react-pdf/renderer` StyleSheet for PDF documents

Never hardcode a brand color or spacing value in a component. Reference Tailwind classes (`text-blue-700`, `bg-gold-500`, `text-aqua-300`) or CSS variables (`var(--c-gold-500)`).

### Utility CSS classes (defined in `src/styles.css`)

| Class | Purpose |
|---|---|
| `.surface-deep` | Darkest section background (ink-950) with radial navy gradient |
| `.surface-base` | Standard dark section background (ink-900) |
| `.glass-dark` | Glassmorphic card on dark backgrounds — blur, border, shadow |
| `.liquid-glass` | Lighter glass for hero pills and secondary CTAs |
| `.card-spotlight` | CSS `--pointer-x/y` radial gradient that follows the mouse |
| `.btn-gold` | Primary gold CTA button |
| `.rule-gold` / `.rule-aqua` | 2px gradient divider lines |

### Product sections and image galleries

Each product (`biodisc`, `bioficient`, `bioair`, `biotec`, `rainstore`, `psd1`) is rendered by `<ProductSection id="..." .../>` in `App.tsx`. The `id` prop must match a folder under `public/images/`. `Gallery.tsx` reads `public/images/{id}/manifest.json` to discover images. After adding or removing images from a product folder, run `npm run gen:images` to regenerate the manifest.

### PDF document generation

`src/documents/` contains `Invoice.js`, `Order.js`, `Proposal.js` — React components rendered with `@react-pdf/renderer`. All use `src/documents/theme.js` for styles (derived from `src/brand/tokens.js`, but using hex-only values because react-pdf does not support `rgba()` or CSS variables). Generate PDFs with `node scripts/gen-doc.mjs <type> --data <json> --out <path>`.

### Calculator page

`src/pages/Calculator.tsx` reads `src/data/pricing.json` to recommend a product based on occupancy, water usage, and groundwater depth inputs. It also integrates the Estonian address lookup widget `InAadress` (loaded via a `<script>` tag in `index.html`) — the widget calls back into the page via `window.InAadress`.

### Lead capture API

`api/submit-lead.ts` is a **Vercel serverless function** (not used in the Netlify build). It accepts POST from `ConsultationForm` and `GrantContactForm`, optionally sends email via Resend and/or inserts to Supabase. Required env vars: `RESEND_API_KEY`, `RESEND_TO`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`.

### SEO / meta tags

`<SEOHead />` (rendered on every page) imperatively writes `<meta>`, `<link rel="canonical">`, hreflang alternates, and JSON-LD structured data (`LocalBusiness`, `FAQPage`, `ItemList`) into `document.head` at runtime. Meta copy comes from i18n keys under `meta.*`. The `scripts/prerender.mjs` script visits each route with Puppeteer after build to write static snapshots so crawlers see rendered HTML.

### Deployment

- **Netlify** (primary): `netlify.toml` runs `npm run build`, publishes `dist/`. SPA redirect catches all routes.
- **Vercel** (if API needed): `api/` directory is picked up automatically for serverless functions.

## Key files

| Path | Role |
|---|---|
| `src/brand/tokens.js` | Brand token single source of truth |
| `src/utils/locales/ee.json` | Estonian strings (default language) |
| `src/utils/locales/en.json` | English strings |
| `src/data/pricing.json` | Pricing data driving the calculator |
| `src/data/downloads.json` | Auto-generated downloads list (do not hand-edit) |
| `public/images/{product}/manifest.json` | Auto-generated image list per product (do not hand-edit) |
| `api/submit-lead.ts` | Vercel serverless lead form handler |
| `scripts/prerender.mjs` | Puppeteer static snapshot generator |
