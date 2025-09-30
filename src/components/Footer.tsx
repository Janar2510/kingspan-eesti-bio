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
        <div className="mt-6">{t('footer.rights')}</div>
      </div>
    </footer>
  )
}
