import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="py-8 md:py-10 bg-white/80 border-t">
      <div className="max-w-6xl mx-auto px-4 md:px-6 text-sm text-kingspan-slate">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
          <div className="font-semibold text-base sm:text-sm">Kingspan Biopuhastid ja Energia</div>
          <div className="text-sm sm:text-base break-all sm:break-normal">info@kingspaneesti.com · <span className="whitespace-nowrap">+372 5610 3001</span></div>
        </div>
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4">
          <span className="text-xs sm:text-sm">{t('footer.rights')}</span>
          <a
            href="/privacy"
            className="btn-ghost inline-flex items-center gap-2 text-xs uppercase tracking-wide"
          >
            {t('footer.privacy')}
          </a>
        </div>
      </div>
    </footer>
  )
}
