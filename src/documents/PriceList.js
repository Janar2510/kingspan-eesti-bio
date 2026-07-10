import {
  h, Document, Page, Text, View, BrandFooter, pageProps, fmtEUR,
} from './theme.js'
import { doc } from '../brand/tokens.js'
import { StyleSheet, Image } from '@react-pdf/renderer'

const LOGO_PATH = new URL('../../public/images/rainstore/Logo.png', import.meta.url).pathname

const C = doc.color

const t = {
  en: {
    brandLine: 'BIO Purification Systems',
    docTitle: 'PRICE LIST',
    validFrom: 'Valid from',
    col: {
      product: 'Product', model: 'Model', material: 'Material', flow: 'Flow', pe: 'P.E.', inlet: 'Inlet height', price: 'Price (EUR)',
    },
    footerNote: 'Prices are indicative and may change without notice. Contact us for a formal quotation.',
  },
  et: {
    brandLine: 'BIO puhastid',
    docTitle: 'HINNAKIRI',
    validFrom: 'Kehtib alates',
    col: {
      product: 'Toode', model: 'Mudel', material: 'Materjal', flow: 'Vooluhulk', pe: 'IE', inlet: 'Sissepääsu kõrgus', price: 'Hind (EUR)',
    },
    footerNote: 'Hinnad on informatiivsed ja võivad muutuda ilma ette teatamata. Ametliku pakkumise saamiseks võtke meiega ühendust.',
  },
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  logo: { width: 80, height: 32, objectFit: 'contain' },
  brandCol: { flexDirection: 'row', alignItems: 'center', gap: 8, maxWidth: 300 },
  brand: { fontSize: doc.font.size.h3, color: C.primary, fontFamily: 'Helvetica', fontWeight: 700 },
  brandSub: { fontSize: doc.font.size.caption, color: C.textMuted, marginTop: 2 },
  meta: { textAlign: 'right', maxWidth: 220 },
  docType: { fontSize: doc.font.size.h1, color: C.primaryDeep, fontFamily: 'Helvetica', fontWeight: 700 },
  metaLine: { fontSize: doc.font.size.small, color: C.textMuted, marginTop: 2 },
  rule: { height: 2, backgroundColor: C.accent, marginBottom: 10 },
  familyTitle: { fontSize: doc.font.size.h2, color: C.primary, fontFamily: 'Helvetica', fontWeight: 700, marginBottom: 8 },
  table: { marginTop: 2 },
  thead: { flexDirection: 'row', backgroundColor: C.tableHeader, paddingVertical: 6, paddingHorizontal: 6 },
  th: { fontSize: doc.font.size.small, color: C.tableHeaderText, fontFamily: 'Helvetica', fontWeight: 700 },
  row: { flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 6, borderBottomWidth: 0.5, borderBottomColor: C.line },
  rowAlt: { backgroundColor: C.zebra },
  cell: { fontSize: doc.font.size.small, color: C.text },
  cProduct: { width: '34%' },
  cModel: { width: '10%' },
  cMaterial: { width: '10%' },
  cFlow: { width: '15%' },
  cPe: { width: '9%' },
  cInlet: { width: '12%' },
  cPriceHead: { width: '10%', textAlign: 'right' },
  cPrice: { width: '10%', textAlign: 'right', fontFamily: 'Helvetica', fontWeight: 700, color: C.primaryDeep },
  note: { marginTop: 14, fontSize: doc.font.size.caption, color: C.textMuted, fontStyle: 'italic' },
})

function dash(v) {
  return v === null || v === undefined || v === '' ? '–' : String(v)
}

export default function PriceList({ lang = 'en', familyTitle = '', validDate = '', rows = [] } = {}) {
  const L = t[lang] || t.en
  return h(Document, { title: `${L.docTitle} — ${familyTitle}`, author: 'Kingspan Eesti BIO' },
    h(Page, pageProps(),
      h(View, { style: styles.header },
        h(View, { style: styles.brandCol },
          h(Image, { style: styles.logo, src: LOGO_PATH }),
          h(View, null,
            h(Text, { style: styles.brand }, doc.company.name),
            h(Text, { style: styles.brandSub }, `${L.brandLine} · ${doc.company.site}`),
          ),
        ),
        h(View, { style: styles.meta },
          h(Text, { style: styles.docType }, L.docTitle),
          h(Text, { style: styles.metaLine }, `${L.validFrom} ${validDate}`),
        ),
      ),
      h(View, { style: styles.rule }),
      h(Text, { style: styles.familyTitle }, familyTitle),
      h(View, { style: styles.table },
        h(View, { style: styles.thead },
          h(Text, { style: [styles.th, styles.cProduct] }, L.col.product),
          h(Text, { style: [styles.th, styles.cModel] }, L.col.model),
          h(Text, { style: [styles.th, styles.cMaterial] }, L.col.material),
          h(Text, { style: [styles.th, styles.cFlow] }, L.col.flow),
          h(Text, { style: [styles.th, styles.cPe] }, L.col.pe),
          h(Text, { style: [styles.th, styles.cInlet] }, L.col.inlet),
          h(Text, { style: [styles.th, styles.cPriceHead] }, L.col.price),
        ),
        ...rows.map((r, i) =>
          h(View, { key: String(i), style: i % 2 ? [styles.row, styles.rowAlt] : styles.row },
            h(Text, { style: [styles.cell, styles.cProduct] }, dash(r.name)),
            h(Text, { style: [styles.cell, styles.cModel] }, dash(r.model)),
            h(Text, { style: [styles.cell, styles.cMaterial] }, dash(r.material)),
            h(Text, { style: [styles.cell, styles.cFlow] }, r.flow ? `${dash(r.flow)} ${r.flowUnit || ''}`.trim() : '–'),
            h(Text, { style: [styles.cell, styles.cPe] }, dash(r.pe)),
            h(Text, { style: [styles.cell, styles.cInlet] }, dash(r.inlet)),
            h(Text, { style: styles.cPrice }, fmtEUR(r.price)),
          ),
        ),
      ),
      h(Text, { style: styles.note }, L.footerNote),
      h(BrandFooter),
    ),
  )
}
