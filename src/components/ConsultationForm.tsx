import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'

export default function ConsultationForm() {
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      const res = await fetch('https://formspree.io/f/mvgdklpz', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      const contentType = res.headers.get('content-type')
      let data: Record<string, unknown> = {}
      if (contentType?.includes('application/json')) data = await res.json()
      if (res.ok) {
        setSent(true)
        form.reset()
      } else {
        const errors = (data.errors as { message?: string }[] | undefined)
        const msg = errors?.map((e) => e.message || e).join(', ') ?? (data.error as string) ?? `Status ${res.status}`
        alert(`Saatmine ebaõnnestus: ${msg}`)
      }
    } catch (err) {
      alert(`Viga: ${err instanceof Error ? err.message : 'Tundmatu viga'}`)
    } finally {
      setSubmitting(false)
    }
  }

  const inputCls =
    'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/12 text-[#EAF1F8] placeholder-[#9FB4CC] text-sm sm:text-base transition-colors focus:outline-none focus:border-gold-500/60 focus:bg-white/8'
  const selectCls = inputCls + ' cursor-pointer'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] as [number, number, number, number] }}
      className="glass-dark rounded-4xl p-6 sm:p-8 md:p-10"
    >
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <span className="block text-xs font-medium tracking-[0.18em] uppercase text-gold-500 mb-3">
          Konsultatsioon
        </span>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#EAF1F8] tracking-tight">
          {t('form.title')}
        </h3>
        <div className="mt-3 rule-gold w-10 rounded-full" />
      </div>

      {sent ? (
        <div className="flex items-center gap-3 p-5 rounded-2xl bg-emerald-900/30 border border-emerald-500/30 text-emerald-300 text-sm sm:text-base">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>Täname — võtame teiega varsti ühendust!</span>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <input
            name="name"
            required
            className={inputCls}
            placeholder={t('form.name') ?? 'Nimi'}
          />
          <input
            name="email"
            required
            type="email"
            className={inputCls}
            placeholder={t('form.email') ?? 'E-post'}
          />
          <input
            name="phone"
            className={inputCls}
            placeholder={t('form.phone') ?? 'Telefon'}
          />
          <select name="type" className={selectCls}>
            <option value="house" className="bg-ink-900 text-[#EAF1F8]">{t('form.type_options.house')}</option>
            <option value="business" className="bg-ink-900 text-[#EAF1F8]">{t('form.type_options.business')}</option>
            <option value="seasonal" className="bg-ink-900 text-[#EAF1F8]">{t('form.type_options.seasonal')}</option>
          </select>
          <input
            name="pe"
            className={inputCls}
            placeholder={t('form.pe') ?? 'Elanike arv'}
          />
          <select name="gw" className={selectCls}>
            <option value="low" className="bg-ink-900 text-[#EAF1F8]">{t('form.gw_options.low')}</option>
            <option value="high" className="bg-ink-900 text-[#EAF1F8]">{t('form.gw_options.high')}</option>
          </select>
          <textarea
            name="message"
            className={inputCls + ' md:col-span-2 resize-none'}
            rows={5}
            placeholder={t('form.message') ?? 'Teade'}
          />
          <label className="md:col-span-2 flex items-start gap-3 text-xs sm:text-sm text-[#9FB4CC] cursor-pointer">
            <input
              required
              type="checkbox"
              name="consent"
              value="yes"
              className="mt-0.5 flex-shrink-0 accent-gold-500"
            />
            <span>{t('form.consent')}</span>
          </label>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="btn-gold inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <Send className="w-4 h-4" />
              {submitting ? t('form.submitting') ?? 'Saadan…' : t('form.submit')}
            </button>
          </div>
        </form>
      )}
    </motion.div>
  )
}
