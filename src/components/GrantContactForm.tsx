import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function GrantContactForm() {
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
                headers: {
                    'Accept': 'application/json'
                }
            })

            if (res.ok) {
                setSent(true)
                form.reset()
            } else {
                const data = await res.json()
                alert(`Saatmine ebaõnnestus: ${data.error || 'Palun proovi hiljem uuesti.'}`)
            }
        } catch (error) {
            console.error('Form submission error:', error)
            alert('Võrguviga: Palun kontrolli internetiühendust.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="card-spotlight card-border p-6 md:p-8 bg-white/90 shadow-card rounded-2xl md:rounded-3xl border-t-4 border-t-kingspan-blue" id="taotlusvorm">
            <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight text-kingspan-navy">Kuidas me saame aidata?</h3>
            <p className="text-kingspan-slate mb-6 leading-relaxed">
                Aitame kokku panna tehnilise lahenduse, võtta hinnapakkumused ja koostada korrektse taotluspaketi.
                Täida allolev vorm ja me võtame sinuga ühendust.
            </p>

            {sent ? (
                <div className="p-6 rounded-2xl bg-green-50 text-green-800 border border-green-200 flex items-center gap-4 animate-fadeIn" role="alert" aria-live="polite">
                    <CheckCircle className="w-8 h-8 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-lg mb-1">Päring edukalt saadetud!</h4>
                        <p>Võtame sinuga ühendust esimesel võimalusel, et täpsustada detaile.</p>
                    </div>
                </div>
            ) : (
                <form onSubmit={onSubmit} action="https://formspree.io/f/mvgdklpz" method="POST" className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Hidden Subject Field */}
                    <input type="hidden" name="_subject" value="Uus Hajaasustuse programmi päring" />

                    {/* Kontaktandmed */}
                    <div className="md:col-span-2">
                        <h4 className="font-semibold text-kingspan-navy mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-kingspan-blue/10 text-kingspan-blue flex items-center justify-center text-xs font-bold">1</span>
                            Taotleja andmed
                        </h4>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-kingspan-slate mb-1">Nimi <span className="text-red-500">*</span></label>
                        <input name="name" required className="w-full px-4 py-3 rounded-xl border border-kingspan-cloud focus:border-kingspan-blue focus:ring-2 focus:ring-kingspan-blue/20 outline-none transition-all" placeholder="Ees- ja perekonnanimi" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-kingspan-slate mb-1">Isikukood</label>
                        <input name="id_code" className="w-full px-4 py-3 rounded-xl border border-kingspan-cloud focus:border-kingspan-blue focus:ring-2 focus:ring-kingspan-blue/20 outline-none transition-all" placeholder="Vajalik taustakontrolliks" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-kingspan-slate mb-1">Telefon <span className="text-red-500">*</span></label>
                        <input name="phone" required type="tel" className="w-full px-4 py-3 rounded-xl border border-kingspan-cloud focus:border-kingspan-blue focus:ring-2 focus:ring-kingspan-blue/20 outline-none transition-all" placeholder="+372 5xxx xxxx" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-kingspan-slate mb-1">E-post <span className="text-red-500">*</span></label>
                        <input name="email" required type="email" className="w-full px-4 py-3 rounded-xl border border-kingspan-cloud focus:border-kingspan-blue focus:ring-2 focus:ring-kingspan-blue/20 outline-none transition-all" placeholder="sinu@email.ee" />
                    </div>

                    {/* Majapidamise andmed */}
                    <div className="md:col-span-2 mt-2">
                        <h4 className="font-semibold text-kingspan-navy mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-kingspan-blue/10 text-kingspan-blue flex items-center justify-center text-xs font-bold">2</span>
                            Majapidamise andmed
                        </h4>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-kingspan-slate mb-1">Aadress <span className="text-red-500">*</span></label>
                        <input name="address" required className="w-full px-4 py-3 rounded-xl border border-kingspan-cloud focus:border-kingspan-blue focus:ring-2 focus:ring-kingspan-blue/20 outline-none transition-all" placeholder="Küla, vald, maakond" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-kingspan-slate mb-1">Katastritunnus</label>
                        <input name="cadastral_id" className="w-full px-4 py-3 rounded-xl border border-kingspan-cloud focus:border-kingspan-blue focus:ring-2 focus:ring-kingspan-blue/20 outline-none transition-all" placeholder="XXXXX:XXX:XXXX" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-kingspan-slate mb-1">Valdkond <span className="text-red-500">*</span></label>
                        <select name="field" className="w-full px-4 py-3 rounded-xl border border-kingspan-cloud focus:border-kingspan-blue focus:ring-2 focus:ring-kingspan-blue/20 outline-none transition-all bg-white">
                            <option value="sewerage">Kanalisatsioonisüsteemid</option>
                            <option value="water">Veevarustussüsteemid</option>
                            <option value="road">Juurdepääsuteed</option>
                            <option value="electricity">Autonoomne elekter</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-kingspan-slate mb-2">Kas elukoht on rahvastikuregistri järgi sama alates 01.01.2026? <span className="text-red-500">*</span></label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="residency_check" value="yes" required className="w-4 h-4 text-kingspan-blue" />
                                <span>Jah</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="residency_check" value="no" required className="w-4 h-4 text-kingspan-blue" />
                                <span>Ei</span>
                            </label>
                        </div>
                    </div>

                    {/* Projekti info */}
                    <div className="md:col-span-2 mt-2">
                        <h4 className="font-semibold text-kingspan-navy mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-kingspan-blue/10 text-kingspan-blue flex items-center justify-center text-xs font-bold">3</span>
                            Projekti info
                        </h4>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-kingspan-slate mb-1">Projekti lühikirjeldus ja probleem <span className="text-red-500">*</span></label>
                        <textarea name="description" required className="w-full px-4 py-3 rounded-xl border border-kingspan-cloud focus:border-kingspan-blue focus:ring-2 focus:ring-kingspan-blue/20 outline-none transition-all" rows={3} placeholder="Nt: Vana septik on amortiseerunud, soovin paigaldada biopuhastit..." />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-kingspan-slate mb-2">Kas varasemalt on toetust saadud (2021-2025)?</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="prior_support" value="yes" className="w-4 h-4 text-kingspan-blue" />
                                <span>Jah</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="prior_support" value="no" className="w-4 h-4 text-kingspan-blue" defaultChecked />
                                <span>Ei</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-kingspan-slate mb-2">Soovin 2 hinnapakkumist</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" name="request_quotes" value="yes" defaultChecked className="w-4 h-4 text-kingspan-blue rounded" />
                                <span>Jah, palun vormistage</span>
                            </label>
                        </div>
                    </div>

                    <div className="md:col-span-2 mt-4 pt-4 border-t border-kingspan-cloud/50">
                        <label className="flex items-start gap-3 text-xs sm:text-sm text-kingspan-slate cursor-pointer">
                            <input required type="checkbox" name="consent" value="yes" className="mt-1 flex-shrink-0 w-4 h-4 text-kingspan-blue rounded" />
                            <span>Olen nõus, et minu andmeid töödeldakse pakkumise koostamiseks ja minuga võetakse ühendust.</span>
                        </label>
                    </div>

                    <div className="md:col-span-2 mt-2">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="btn-primary w-full py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {submitting ? (
                                <>Saadan...</>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Küsi pakkumist ja abi
                                </>
                            )}
                        </button>
                        <p className="text-center text-xs text-kingspan-slate mt-3">
                            Vastame tavaliselt 1 tööpäeva jooksul. Sinu andmed on kaitstud.
                        </p>
                    </div>
                </form>
            )}
        </div>
    )
}
