import {
  h, Document, Page, BrandHeader, Parties, ItemsTable, TotalsBlock, Notes, BrandFooter, pageProps, computeTotals,
} from './theme.js'

/** Invoice (Arve). data: { number, date, client, items[], notes } */
export default function Invoice(data = {}) {
  const { lines, subtotal, vat, total, vatRate } = computeTotals(data.items)
  return h(Document, { title: `Arve ${data.number || ''}`, author: 'Kingspan Eesti BIO' },
    h(Page, pageProps(),
      h(BrandHeader, { title: 'ARVE', number: data.number, date: data.date }),
      h(Parties, { client: data.client }),
      h(ItemsTable, { lines, showPrices: true }),
      h(TotalsBlock, { subtotal, vat, total, vatRate }),
      h(Notes, { text: data.notes }),
      h(BrandFooter),
    ),
  )
}
