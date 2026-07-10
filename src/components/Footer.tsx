import { useTranslation } from 'react-i18next'

const productLinks = [
  { label: 'BioDisc', href: '/#biodisc' },
  { label: 'BioFicient', href: '/#bioficient' },
  { label: 'BioAir', href: '/#bioair' },
  { label: 'BioTec Flo', href: '/#biotec' },
  { label: 'RainStore', href: '/#rainstore' },
  { label: 'PSD1', href: '/#psd1' },
]

export default function Footer() {
  const { t } = useTranslation()
  const pageLinks = [
    { label: t('navigation.calculator'), href: '/calculator' },
    { label: 'Hajaasustus 2026', href: '/hajaasustuse-programm' },
    { label: t('navigation.downloads'), href: '/#downloads' },
    { label: t('navigation.about'), href: '/about' },
  ]

  return (
    <footer className="surface-deep py-16 md:py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-6 text-sm text-[#9FB4CC]">
        <div className="rule-gold w-16 rounded-full mb-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="font-bold text-base text-[#EAF1F8]">Kingspan Biopuhastid ja Energia</div>
            <p className="mt-3 leading-relaxed max-w-xs">{t('footer.tagline')}</p>
          </div>

          <nav aria-label={t('footer.products')}>
            <div className="font-semibold text-[#EAF1F8] mb-4">{t('footer.products')}</div>
            <ul className="space-y-2">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-aqua-300 transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t('footer.pages')}>
            <div className="font-semibold text-[#EAF1F8] mb-4">{t('footer.pages')}</div>
            <ul className="space-y-2">
              {pageLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-aqua-300 transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="font-semibold text-[#EAF1F8] mb-4">{t('footer.contact')}</div>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@kingspaneesti.com" className="hover:text-aqua-300 transition-colors break-all">
                  info@kingspaneesti.com
                </a>
              </li>
              <li>
                <a href="tel:+37256103001" className="whitespace-nowrap hover:text-aqua-300 transition-colors">
                  +372 5610 3001
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4">
          <span className="text-xs sm:text-sm">{t('footer.rights')}</span>
          <a
            href="/privacy"
            className="text-xs uppercase tracking-[0.18em] text-[#9FB4CC] hover:text-aqua-300 transition-colors"
          >
            {t('footer.privacy')}
          </a>
        </div>
      </div>
    </footer>
  )
}
