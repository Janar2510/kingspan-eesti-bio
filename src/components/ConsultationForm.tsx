import { useState } from 'react'
import { useTranslation } from 'react-i18next'

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
      
      // Log form data for debugging
      console.log('Submitting form data:', Object.fromEntries(formData.entries()))
      
      const res = await fetch('https://formspree.io/f/mvgdklpz', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      console.log('Formspree response status:', res.status, res.statusText)
      
      // Check if response is JSON
      const contentType = res.headers.get('content-type')
      let data: any = {}
      
      if (contentType && contentType.includes('application/json')) {
        data = await res.json()
      } else {
        const text = await res.text()
        console.warn('Non-JSON response from Formspree:', text)
      }
      
      if (res.ok) {
        setSent(true)
        form.reset()
      } else {
        // Formspree error handling
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map((error: any) => error.message || error).join(', ')
          alert(`Submission failed: ${errorMessages}`)
        } else if (data.error) {
          alert(`Submission failed: ${data.error}`)
        } else {
          console.error('Formspree error response:', data, 'Status:', res.status)
          alert(`Submission failed. Status: ${res.status}. Please check the browser console for details.`)
        }
      }
    } catch (error) {
      console.error('Form submission error:', error)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        alert('Network error: Unable to connect to Formspree. Please check your internet connection.')
      } else {
        alert(`Submission error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check the browser console for details.`)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="glow-wrap">
      <div className="glow-card p-4 sm:p-6 rounded-2xl md:rounded-3xl bg-white/80 border shadow-card">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 tracking-tight">{t('form.title')}</h3>
      {sent ? (
        <div className="p-4 rounded-xl bg-green-50 text-green-800 text-sm sm:text-base">Thanks — we will contact you shortly.</div>
      ) : (
        <form onSubmit={onSubmit} action="https://formspree.io/f/mvgdklpz" method="POST" className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
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
            <input required type="checkbox" name="consent" value="yes" className="mt-1 flex-shrink-0" /> <span>{t('form.consent')}</span>
          </label>
          <div className="md:col-span-2">
            <button 
              type="submit" 
              disabled={submitting}
              className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {submitting ? t('form.submitting') || 'Sending...' : t('form.submit')}
            </button>
          </div>
        </form>
      )}
      </div>
    </div>
  )
}
