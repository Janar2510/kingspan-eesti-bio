# Kingspan Eesti BIO — Bilingual Starter (React + Vite + Tailwind)

## Quick start
```bash
pnpm i
pnpm dev
# open http://localhost:5173
```

## Add brochures & datasheets
1. Place your PDF (or DOC/DOCX) files into `public/downloads/` (the folder lives in the repo so you can drop assets straight in).
2. Regenerate the list with `pnpm gen:downloads` (or `npm run gen:downloads`). This rewrites `src/data/downloads.json` including file size and language hints.
3. Commit the updated files. The frontend links to `/downloads/{filename}` automatically.

## Brand
- Kingspan Blue: #003A70
- Kingspan Gold: #C69214
- Navy: #002B4A
- Slate: #64748B
- Cloud: #F5F7FA

## i18n
Language toggle switches EE ↔ EN. Strings live in `src/utils/locales/ee.json` and `en.json`.


## Auto-generate Downloads
The `pnpm gen:downloads` (or `npm run gen:downloads`) script ensures the `public/downloads/` folder exists, then scans for brochure files and updates `src/data/downloads.json`. Run it any time you add, remove, or rename assets.

## Image Galleries
Add product images to `public/images/{biodisc|bioficient|bioair|biotec|rainstore|psd1}/` and list file names in each folder's `manifest.json`.

## Sitemap & SEO
The sitemap is generated automatically and includes all pages and sections. To regenerate with a custom base URL:

```bash
SITE_URL=https://your-domain.com pnpm gen:sitemap
# or
npm run gen:sitemap
```

The sitemap includes:
- Homepage and language variants (EE/EN)
- All product sections (`#biodisc`, `#bioficient`, etc.)
- Downloads and contact sections
- Privacy policy page

The `robots.txt` file is configured to allow all crawlers and reference the sitemap.

## Lead Form API (Vercel)
Deploy on Vercel and set env vars:
- RESEND_API_KEY, RESEND_TO (optional email send)
- SUPABASE_URL, SUPABASE_SERVICE_KEY (optional DB insert to `web_leads` table)

Form POSTs to `/api/submit-lead`.
