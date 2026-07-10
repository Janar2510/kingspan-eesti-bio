#!/usr/bin/env node
/**
 * gen-pricelists — render branded EN + ET price-list PDFs, one file per BIO
 * puhastid product family, from scripts/data/bio-purifiers-pricelist.json.
 *
 *   node scripts/gen-pricelists.mjs
 */
import { renderToFile } from '@react-pdf/renderer'
import { readFileSync, mkdirSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import PriceList from '../src/documents/PriceList.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const families = JSON.parse(readFileSync(resolve(root, 'scripts/data/bio-purifiers-pricelist.json'), 'utf8'))

const TITLES_ET = {
  bioair: 'BioAir',
  biodisc: 'BioDisc',
  bioficient: 'BioFicient',
  biotecflo: 'BioTec Flo',
  rainstore: 'RainStore (vihmaveemahutid)',
  commercialtanks: 'Kommertsmahutid vedelikele',
  pumpstations: 'Pumbajaamad (PSD)',
  fullretention: 'Õli- ja bensiinipüüdurid — täismahuga',
  bypass: 'Õli- ja bensiinipüüdurid — 10x möödajuhtimisega',
}

const VALID_DATE = '04.05.2026'
const outDir = resolve(root, 'public/downloads/pricelists')
mkdirSync(outDir, { recursive: true })

async function main() {
  for (const [key, fam] of Object.entries(families)) {
    for (const lang of ['en', 'et']) {
      const familyTitle = lang === 'et' ? (TITLES_ET[key] || fam.title) : fam.title
      const outPath = resolve(outDir, `${key}-${lang}.pdf`)
      await renderToFile(
        PriceList({ lang, familyTitle, validDate: VALID_DATE, rows: fam.rows }),
        outPath,
      )
      console.log(`✓ ${key} (${lang}) → ${outPath.replace(root + '/', '')}`)
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
