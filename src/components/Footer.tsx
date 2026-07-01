import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="surface-deep py-12 md:py-16 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-6 text-sm text-[#9FB4CC]">
        <div className="rule-gold w-16 rounded-full mb-8" />
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
          <div className="font-semibold text-base text-[#EAF1F8]">Kingspan Biopuhastid ja Energia</div>
          <div className="text-sm sm:text-base break-all sm:break-normal">
            <a href="mailto:info@kingspaneesti.com" className="hover:text-aqua-300 transition-colors">info@kingspaneesti.com</a>
            {' · '}
            <a href="tel:+37256103001" className="whitespace-nowrap hover:text-aqua-300 transition-colors">+372 5610 3001</a>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4">
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
