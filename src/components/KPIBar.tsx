import { useTranslation } from 'react-i18next'

export default function KPIBar() {
  const { t } = useTranslation()
  return (
    <section className="py-6 bg-white">
      <div className="px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-kingspan-slate">
        <div className="p-4 rounded-2xl bg-kingspan-cloud">{t('kpi.a')}</div>
        <div className="p-4 rounded-2xl bg-kingspan-cloud">{t('kpi.b')}</div>
        <div className="p-4 rounded-2xl bg-kingspan-cloud">{t('kpi.c')}</div>
        <div className="p-4 rounded-2xl bg-kingspan-cloud">{t('kpi.d')}</div>
      </div>
    </section>
  )
}