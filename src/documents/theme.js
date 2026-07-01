/**
 * Shared document theme — maps brand tokens → @react-pdf/renderer.
 * Reused by Invoice / Proposal / Order so every PDF matches the website.
 *
 * Plain JS + React.createElement (aliased `h`) so the templates run under
 * bare `node` with no JSX transpile step.
 */
import { createElement } from 'react'
import {
  Document, Page, View, Text, StyleSheet, Font,
} from '@react-pdf/renderer'
import { createRequire } from 'module'
import { doc } from '../brand/tokens.js'

const require = createRequire(import.meta.url)
const pricing = require('../data/pricing.json')

export const h = createElement
export { Document, Page, View, Text }

/* ---- Fonts ----------------------------------------------------------
 * Defaults to built-in Helvetica for zero-dependency rendering.
 * To use brand Inter: drop Inter TTFs in src/documents/fonts/ and
 * uncomment the Font.register block below.
 * ------------------------------------------------------------------- */
export const FONT = 'Helvetica'
// Font.register({ family: 'Inter', fonts: [
//   { src: './src/documents/fonts/Inter-Regular.ttf' },
//   { src: './src/documents/fonts/Inter-Medium.ttf', fontWeight: 500 },
//   { src: './src/documents/fonts/Inter-Bold.ttf', fontWeight: 700 },
// ]})
void Font

const C = doc.color
const S = doc.font.size

/* ---- Currency + math ---------------------------------------------- */
export const fmtEUR = (n) =>
  new Intl.NumberFormat('et-EE', { style: 'currency', currency: 'EUR' }).format(n || 0)

/** Find a product's end-user price by name across all pricing groups. */
export function resolvePrice(name) {
  if (!name) return null
  const target = String(name).trim().toLowerCase()
  for (const group of Object.values(pricing)) {
    if (!Array.isArray(group)) continue
    const hit = group.find((p) => String(p.productName).trim().toLowerCase() === target)
    if (hit) return hit.priceEndUser
  }
  return null
}

/** Build priced lines + totals. Explicit item.price wins; else resolve from pricing.json. */
export function computeTotals(items = [], vatRate = doc.company.vatRate) {
  const lines = items.map((it) => {
    const unit = it.price != null ? Number(it.price) : (resolvePrice(it.product) ?? 0)
    const qty = it.qty != null ? Number(it.qty) : 1
    return { ...it, unit, qty, amount: unit * qty }
  })
  const subtotal = lines.reduce((s, l) => s + l.amount, 0)
  const vat = subtotal * vatRate
  return { lines, subtotal, vat, total: subtotal + vat, vatRate }
}

/* ---- Styles ------------------------------------------------------- */
export const styles = StyleSheet.create({
  page: {
    fontFamily: FONT,
    fontSize: S.body,
    color: C.text,
    paddingHorizontal: doc.margin.x,
    paddingVertical: doc.margin.y,
    backgroundColor: C.surface,
  },
  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  brand: { fontSize: S.h2, color: C.primary, fontFamily: FONT, fontWeight: 700 },
  brandSub: { fontSize: S.caption, color: C.textMuted, marginTop: 2 },
  docType: { fontSize: S.h1, color: C.primaryDeep, fontFamily: FONT, fontWeight: 700, textAlign: 'right' },
  docMeta: { fontSize: S.small, color: C.textMuted, textAlign: 'right', marginTop: 2 },
  rule: { height: 2, backgroundColor: C.accent, marginVertical: 12 },
  // Parties
  parties: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  party: { width: '48%' },
  label: { fontSize: S.caption, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 },
  strong: { fontFamily: FONT, fontWeight: 700, color: C.text },
  // Table
  table: { marginTop: 4 },
  thead: { flexDirection: 'row', backgroundColor: C.tableHeader, color: C.tableHeaderText, paddingVertical: 6, paddingHorizontal: 8, borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  th: { fontSize: S.small, color: C.tableHeaderText, fontFamily: FONT, fontWeight: 700 },
  row: { flexDirection: 'row', paddingVertical: 6, paddingHorizontal: 8, borderBottomWidth: 0.5, borderBottomColor: C.line },
  rowAlt: { backgroundColor: C.zebra },
  cDesc: { width: '52%' },
  cQty: { width: '12%', textAlign: 'right' },
  cUnit: { width: '18%', textAlign: 'right' },
  cAmt: { width: '18%', textAlign: 'right' },
  // Totals
  totals: { marginTop: 14, marginLeft: 'auto', width: '46%' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  totalGrand: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, marginTop: 4, borderTopWidth: 1.5, borderTopColor: C.primary },
  grandText: { fontSize: S.h2, fontFamily: FONT, fontWeight: 700, color: C.primaryDeep },
  // Body / notes
  h3: { fontSize: S.h3, fontFamily: FONT, fontWeight: 700, color: C.primary, marginBottom: 4, marginTop: 12 },
  p: { fontSize: S.body, color: C.text, lineHeight: 1.5, marginBottom: 6 },
  notes: { marginTop: 18, padding: 10, backgroundColor: C.surfaceAlt, borderRadius: 4, borderLeftWidth: 3, borderLeftColor: C.accent },
  // Footer
  footer: { position: 'absolute', left: doc.margin.x, right: doc.margin.x, bottom: 24, borderTopWidth: 0.5, borderTopColor: C.line, paddingTop: 6, flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontSize: S.caption, color: C.textMuted },
})

/* ---- Shared building blocks --------------------------------------- */

export function BrandHeader({ title, number, date }) {
  const co = doc.company
  return h(View, null,
    h(View, { style: styles.header },
      h(View, null,
        h(Text, { style: styles.brand }, co.name),
        h(Text, { style: styles.brandSub }, `${co.legal} · ${co.site}`),
      ),
      h(View, null,
        h(Text, { style: styles.docType }, title),
        number ? h(Text, { style: styles.docMeta }, `Nr ${number}`) : null,
        date ? h(Text, { style: styles.docMeta }, date) : null,
      ),
    ),
    h(View, { style: styles.rule }),
  )
}

export function Parties({ client }) {
  const co = doc.company
  return h(View, { style: styles.parties },
    h(View, { style: styles.party },
      h(Text, { style: styles.label }, 'Müüja / Seller'),
      h(Text, { style: styles.strong }, co.name),
      h(Text, null, co.legal),
      h(Text, null, co.email),
      h(Text, null, co.phone),
    ),
    h(View, { style: styles.party },
      h(Text, { style: styles.label }, 'Klient / Client'),
      h(Text, { style: styles.strong }, client?.name || '—'),
      client?.address ? h(Text, null, client.address) : null,
      client?.reg ? h(Text, null, `Reg/VAT: ${client.reg}`) : null,
      client?.email ? h(Text, null, client.email) : null,
    ),
  )
}

export function ItemsTable({ lines, showPrices = true }) {
  return h(View, { style: styles.table },
    h(View, { style: styles.thead },
      h(Text, { style: [styles.th, styles.cDesc] }, 'Kirjeldus / Description'),
      h(Text, { style: [styles.th, styles.cQty] }, 'Kogus'),
      showPrices ? h(Text, { style: [styles.th, styles.cUnit] }, 'Ühik') : null,
      showPrices ? h(Text, { style: [styles.th, styles.cAmt] }, 'Summa') : null,
    ),
    ...lines.map((l, i) =>
      h(View, { key: String(i), style: i % 2 ? [styles.row, styles.rowAlt] : styles.row },
        h(Text, { style: styles.cDesc }, l.product || l.description || '—'),
        h(Text, { style: styles.cQty }, String(l.qty)),
        showPrices ? h(Text, { style: styles.cUnit }, fmtEUR(l.unit)) : null,
        showPrices ? h(Text, { style: styles.cAmt }, fmtEUR(l.amount)) : null,
      ),
    ),
  )
}

export function TotalsBlock({ subtotal, vat, total, vatRate }) {
  return h(View, { style: styles.totals },
    h(View, { style: styles.totalRow },
      h(Text, null, 'Vahesumma / Subtotal'),
      h(Text, null, fmtEUR(subtotal)),
    ),
    h(View, { style: styles.totalRow },
      h(Text, null, `Käibemaks / VAT (${Math.round(vatRate * 100)}%)`),
      h(Text, null, fmtEUR(vat)),
    ),
    h(View, { style: styles.totalGrand },
      h(Text, { style: styles.grandText }, 'Kokku / Total'),
      h(Text, { style: styles.grandText }, fmtEUR(total)),
    ),
  )
}

export function Notes({ text }) {
  if (!text) return null
  return h(View, { style: styles.notes }, h(Text, { style: styles.p }, text))
}

export function BrandFooter() {
  const co = doc.company
  return h(View, { style: styles.footer, fixed: true },
    h(Text, { style: styles.footerText }, `${co.name} · ${co.email} · ${co.phone}`),
    h(Text, { style: styles.footerText, render: ({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}` }),
  )
}

export function pageProps() {
  return { size: 'A4', style: styles.page }
}
