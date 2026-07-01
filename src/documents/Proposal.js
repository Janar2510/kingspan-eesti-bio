import {
  h, Document, Page, Text, View, BrandHeader, Parties, ItemsTable, TotalsBlock, Notes, BrandFooter, pageProps, computeTotals, styles,
} from './theme.js'

/** Proposal (Pakkumine). data: { number, date, client, intro, items[], validUntil, notes } */
export default function Proposal(data = {}) {
  const { lines, subtotal, vat, total, vatRate } = computeTotals(data.items)
  return h(Document, { title: `Pakkumine ${data.number || ''}`, author: 'Kingspan Eesti BIO' },
    h(Page, pageProps(),
      h(BrandHeader, { title: 'PAKKUMINE', number: data.number, date: data.date }),
      h(Parties, { client: data.client }),
      data.intro
        ? h(View, null, h(Text, { style: styles.p }, data.intro))
        : null,
      h(Text, { style: styles.h3 }, 'Lahendus / Solution'),
      h(ItemsTable, { lines, showPrices: true }),
      h(TotalsBlock, { subtotal, vat, total, vatRate }),
      data.validUntil
        ? h(Text, { style: [styles.p, { marginTop: 10 }] }, `Pakkumine kehtib kuni ${data.validUntil}.`)
        : null,
      h(Notes, { text: data.notes }),
      h(BrandFooter),
    ),
  )
}
