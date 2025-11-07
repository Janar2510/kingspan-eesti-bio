import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="py-10 bg-white/80 border-t">
      <div className="max-w-6xl mx-auto px-6 text-sm text-kingspan-slate">
        <div className="flex flex-wrap justify-between gap-6">
          <div className="font-semibold">Kingspan Water & Energy — Estonia</div>
          <div className="">info@example.ee · +372 5555 5555</div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span>{t('footer.rights')}</span>
          <a
            href="/privacy"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-kingspan-cloud hover:bg-kingspan-cloud text-xs uppercase tracking-wide"
          >
            {t('footer.privacy')}
          </a>
        </div>
      </div>
    </footer>
  )
}
