import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function ConsultationForm() {
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const form = e.target as HTMLFormElement
      const data = Object.fromEntries(new FormData(form).entries())
      const res = await fetch('/api/submit-lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (res.ok) setSent(true); else alert('Submission failed')
    } catch { alert('Submission error') }
  }

  return (
    <div className="p-4 sm:p-6 rounded-2xl md:rounded-3xl bg-white/80 border shadow-card">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6">{t('form.title')}</h3>
      {sent ? (
        <div className="p-4 rounded-xl bg-green-50 text-green-800 text-sm sm:text-base">Thanks — we will contact you shortly.</div>
      ) : (
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <input name="name" required className="px-4 py-2.5 sm:py-3 rounded-xl border text-sm sm:text-base" placeholder={t('form.name')!} />
          <input name="email" required type="email" className="px-4 py-2.5 sm:py-3 rounded-xl border text-sm sm:text-base" placeholder={t('form.email')!} />
          <input name="phone" className="px-4 py-2.5 sm:py-3 rounded-xl border text-sm sm:text-base" placeholder={t('form.phone')!} />
          <select name="type" className="px-4 py-2.5 sm:py-3 rounded-xl border text-sm sm:text-base">
            <option value="house">{t('form.type_options.house')}</option>
            <option value="business">{t('form.type_options.business')}</option>
            <option value="seasonal">{t('form.type_options.seasonal')}</option>
          </select>
          <input name="pe" className="px-4 py-2.5 sm:py-3 rounded-xl border text-sm sm:text-base" placeholder={t('form.pe')!} />
          <select name="gw" className="px-4 py-2.5 sm:py-3 rounded-xl border text-sm sm:text-base">
            <option value="low">{t('form.gw_options.low')}</option>
            <option value="high">{t('form.gw_options.high')}</option>
          </select>
          <textarea name="message" className="md:col-span-2 px-4 py-2.5 sm:py-3 rounded-xl border text-sm sm:text-base" rows={5} placeholder={t('form.message')!} />
          <label className="md:col-span-2 flex items-start gap-3 text-xs sm:text-sm text-kingspan-slate">
            <input required type="checkbox" className="mt-1 flex-shrink-0" /> <span>{t('form.consent')}</span>
          </label>
          <div className="md:col-span-2">
            <button className="w-full sm:w-auto px-6 py-3 rounded-3xl bg-kingspan-blue text-white hover:opacity-90 text-sm sm:text-base">{t('form.submit')}</button>
          </div>
        </form>
      )}
    </div>
  )
}
