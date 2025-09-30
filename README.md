# Kingspan Eesti BIO — Bilingual Starter (React + Vite + Tailwind)

## Quick start
```bash
pnpm i
pnpm dev
# open http://localhost:5173
```

## Add brochures
Put your PDF files into `public/downloads/` and update `src/data/downloads.json` if you rename files.

## Brand
- Kingspan Blue: #003A70
- Kingspan Gold: #C69214
- Navy: #002B4A
- Slate: #64748B
- Cloud: #F5F7FA

## i18n
Language toggle switches EE ↔ EN. Strings live in `src/utils/locales/ee.json` and `en.json`.


## Auto-generate Downloads
Put PDFs into `public/downloads/` and run:
```bash
pnpm gen:downloads
```
This writes `src/data/downloads.json` automatically (includes file size & language guess).

## Image Galleries
Add product images to `public/images/{biodisc|bioficient|bioair|biotec|rainstore|psd1}/` and list file names in each folder's `manifest.json`.

## Lead Form API (Vercel)
Deploy on Vercel and set env vars:
- RESEND_API_KEY, RESEND_TO (optional email send)
- SUPABASE_URL, SUPABASE_SERVICE_KEY (optional DB insert to `web_leads` table)

Form POSTs to `/api/submit-lead`.
