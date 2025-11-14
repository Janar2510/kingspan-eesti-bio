import { useTranslation } from 'react-i18next'

export default function KPIBar() {
  const { t } = useTranslation()
  return (
    <section className="py-4 md:py-6 bg-white">
      <div className="px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-center text-xs sm:text-sm md:text-base text-kingspan-slate">
        <div className="p-3 sm:p-4 rounded-xl md:rounded-2xl bg-kingspan-cloud">{t('kpi.a')}</div>
        <div className="p-3 sm:p-4 rounded-xl md:rounded-2xl bg-kingspan-cloud">{t('kpi.b')}</div>
        <div className="p-3 sm:p-4 rounded-xl md:rounded-2xl bg-kingspan-cloud">{t('kpi.c')}</div>
        <div className="p-3 sm:p-4 rounded-xl md:rounded-2xl bg-kingspan-cloud">{t('kpi.d')}</div>
      </div>
    </section>
  )
}