#!/usr/bin/env node
/**
 * gen-doc — render a branded PDF (proposal / invoice / order) from JSON data.
 *
 *   node scripts/gen-doc.mjs <type> --data <file.json> --out <file.pdf>
 *
 * Types: invoice | proposal | order
 * Prices auto-resolve from src/data/pricing.json when item.price is omitted.
 */
import { renderToFile } from '@react-pdf/renderer'
import { readFileSync, mkdirSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import Invoice from '../src/documents/Invoice.js'
import Proposal from '../src/documents/Proposal.js'
import Order from '../src/documents/Order.js'

const TEMPLATES = { invoice: Invoice, proposal: Proposal, order: Order }
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function parseArgs(argv) {
  const [type, ...rest] = argv
  const args = { type }
  for (let i = 0; i < rest.length; i += 2) {
    const key = rest[i]?.replace(/^--/, '')
    if (key) args[key] = rest[i + 1]
  }
  return args
}

async function main() {
  const { type, data, out } = parseArgs(process.argv.slice(2))
  const Template = TEMPLATES[type]
  if (!Template) {
    console.error(`Unknown type "${type}". Use: ${Object.keys(TEMPLATES).join(' | ')}`)
    process.exit(1)
  }
  if (!data || !out) {
    console.error('Required: --data <file.json> --out <file.pdf>')
    process.exit(1)
  }
  const payload = JSON.parse(readFileSync(resolve(root, data), 'utf8'))
  const outPath = resolve(root, out)
  mkdirSync(dirname(outPath), { recursive: true })
  await renderToFile(Template(payload), outPath)
  console.log(`✓ ${type} → ${out}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
