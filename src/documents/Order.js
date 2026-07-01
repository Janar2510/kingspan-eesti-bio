import {
  h, Document, Page, Text, View, BrandHeader, Parties, ItemsTable, TotalsBlock, Notes, BrandFooter, pageProps, computeTotals, styles,
} from './theme.js'

/** Order confirmation (Tellimuse kinnitus). data: { number, date, client, items[], delivery, notes } */
export default function Order(data = {}) {
  const { lines, subtotal, vat, total, vatRate } = computeTotals(data.items)
  return h(Document, { title: `Tellimus ${data.number || ''}`, author: 'Kingspan Eesti BIO' },
    h(Page, pageProps(),
      h(BrandHeader, { title: 'TELLIMUS', number: data.number, date: data.date }),
      h(Parties, { client: data.client }),
      h(ItemsTable, { lines, showPrices: true }),
      h(TotalsBlock, { subtotal, vat, total, vatRate }),
      data.delivery
        ? h(View, null,
            h(Text, { style: styles.h3 }, 'Tarne / Delivery'),
            h(Text, { style: styles.p }, data.delivery),
          )
        : null,
      h(Notes, { text: data.notes }),
      h(BrandFooter),
    ),
  )
}
