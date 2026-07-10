import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GrantContactForm from '../components/GrantContactForm'
import { Check, AlertTriangle, FileText, Calendar, ArrowRight, XCircle, Waves, Download } from 'lucide-react'

export default function Hajaasustus() {
    const { t, i18n } = useTranslation()

    useEffect(() => {
        // Set page title and meta description manually for this specific landing page
        document.title = t('hajaasustus.meta.title')

        const metaDesc = document.querySelector('meta[name="description"]')
        if (metaDesc) {
            metaDesc.setAttribute('content', t('hajaasustus.meta.description'));
        } else {
            const meta = document.createElement('meta');
            meta.name = "description";
            meta.content = t('hajaasustus.meta.description');
            document.head.appendChild(meta);
        }
    }, [t])

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.biopuhastid.com/hajaasustuse-programm/#webpage",
                "url": "https://www.biopuhastid.com/hajaasustuse-programm/",
                "name": t('hajaasustus.meta.title'),
                "description": t('hajaasustus.meta.description'),
                "isPartOf": { "@id": "https://www.biopuhastid.com/#website" },
                "datePublished": "2026-02-19T08:00:00+02:00",
                "dateModified": "2026-02-19T17:00:00+02:00",
                "breadcrumb": { "@id": "https://www.biopuhastid.com/hajaasustuse-programm/#breadcrumb" },
                "inLanguage": i18n.language
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://www.biopuhastid.com/hajaasustuse-programm/#breadcrumb",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://www.biopuhastid.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": t('hajaasustus.nav_title'),
                        "item": "https://www.biopuhastid.com/hajaasustuse-programm/"
                    }
                ]
            },
            {
                "@type": "HowTo",
                "name": t('hajaasustus.meta.title'),
                "step": [
                    {
                        "@type": "HowToStep",
                        "name": t('hajaasustus.checklist.title'),
                        "text": t('hajaasustus.checklist.items.0')
                    },
                    {
                        "@type": "HowToStep",
                        "name": t('hajaasustus.activities.title'),
                        "text": t('hajaasustus.activities.sewerage.desc')
                    },
                    {
                        "@type": "HowToStep",
                        "name": t('hajaasustus.steps.step1.title'),
                        "text": t('hajaasustus.steps.step1.desc')
                    },
                    {
                        "@type": "HowToStep",
                        "name": t('hajaasustus.steps.step3.title'),
                        "text": t('hajaasustus.steps.step3.desc')
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": t('hajaasustus.faq.q1.q'),
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": t('hajaasustus.faq.q1.a')
                        }
                    },
                    {
                        "@type": "Question",
                        "name": t('hajaasustus.faq.q2.q'),
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": t('hajaasustus.faq.q2.a')
                        }
                    },
                    {
                        "@type": "Question",
                        "name": t('hajaasustus.faq.q3.q'),
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": t('hajaasustus.faq.q3.a')
                        }
                    },
                    {
                        "@type": "Question",
                        "name": t('hajaasustus.faq.q4.q'),
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": t('hajaasustus.faq.q4.a')
                        }
                    }
                ]
            },
            {
                "@type": "Organization",
                "name": "Kingspan Biopuhastid",
                "url": "https://www.biopuhastid.com",
                "logo": "https://www.biopuhastid.com/Kingspan%20Logo.jpeg",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+372 5610 3001",
                    "contactType": "customer service",
                    "email": "info@kingspaneesti.com",
                    "areaServed": "EE",
                    "availableLanguage": ["Estonian", "English"]
                }
            }
        ]
    }

    return (
        <div className="surface-base font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Header />

            {/* Hero Section */}
            <section className="surface-deep water-field relative pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <span className="glass-dark inline-block py-1 px-4 rounded-pill text-aqua-300 font-semibold text-sm mb-5">
                        {t('hajaasustus.hero.badge')}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-[#EAF1F8] leading-tight">
                        {t('hajaasustus.hero.title_prefix')} <br />
                        <span className="text-gold-400">{t('hajaasustus.hero.title_highlight')}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[#9FB4CC] mb-10 max-w-2xl mx-auto leading-relaxed">
                        {t('hajaasustus.hero.description')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#taotlusvorm" className="btn-gold inline-flex items-center justify-center gap-2 px-8 py-3 text-lg">
                            {t('hajaasustus.hero.cta_primary')} <ArrowRight className="w-5 h-5" />
                        </a>
                        <a href="#sammud" className="btn-outline-light inline-flex items-center justify-center px-8 py-3 text-lg">
                            {t('hajaasustus.hero.cta_secondary')}
                        </a>
                    </div>
                </div>
            </section>

            {/* Quick Info Box (Kiire ülevaade) */}
            <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-20">
                <div className="glass-dark rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex flex-col border-b md:border-b-0 md:border-r border-white/15 pb-4 md:pb-0">
                        <span className="text-sm text-[#9FB4CC] uppercase tracking-wider font-semibold mb-1">{t('hajaasustus.quick_info.round')}</span>
                        <span className="text-lg font-bold text-[#EAF1F8]">02.02 – 02.04.2026</span>
                    </div>
                    <div className="flex flex-col border-b md:border-b-0 lg:border-r md:border-r-0 border-white/15 pb-4 md:pb-0">
                        <span className="text-sm text-[#9FB4CC] uppercase tracking-wider font-semibold mb-1">{t('hajaasustus.quick_info.max_support')}</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-green-600">6500 €</span>
                            <span className="text-sm text-[#9FB4CC]">{t('hajaasustus.quick_info.max_support_sub')}</span>
                        </div>
                    </div>
                    <div className="flex flex-col border-b md:border-b-0 md:border-r border-white/15 pb-4 md:pb-0">
                        <span className="text-sm text-[#9FB4CC] uppercase tracking-wider font-semibold mb-1">{t('hajaasustus.quick_info.rate')}</span>
                        <span className="text-lg font-bold text-[#EAF1F8]">67%</span>
                        <span className="text-xs text-[#9FB4CC]">{t('hajaasustus.quick_info.rate_sub')}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-[#9FB4CC] uppercase tracking-wider font-semibold mb-1">{t('hajaasustus.quick_info.project_end')}</span>
                        <span className="text-lg font-bold text-[#EAF1F8]">31.10.2027</span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-16 space-y-20">

                {/* 1. Kas sa oled sobiv taotleja? */}
                <section id="kontrollnimekiri">
                    <h2 className="text-3xl font-bold mb-6 text-[#EAF1F8]">{t('hajaasustus.checklist.title')}</h2>
                    <div className="glass-dark rounded-2xl p-6">
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                                <span className="text-[#9FB4CC]" dangerouslySetInnerHTML={{ __html: t('hajaasustus.checklist.items.0') }} />
                            </li>
                            <li className="flex gap-3">
                                <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                                <span className="text-[#9FB4CC]" dangerouslySetInnerHTML={{ __html: t('hajaasustus.checklist.items.1') }} />
                            </li>
                            <li className="flex gap-3">
                                <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                                <span className="text-[#9FB4CC]" dangerouslySetInnerHTML={{ __html: t('hajaasustus.checklist.items.2') }} />
                            </li>
                            <li className="flex gap-3">
                                <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                                <span className="text-[#9FB4CC]" dangerouslySetInnerHTML={{ __html: t('hajaasustus.checklist.items.3') }} />
                            </li>
                        </ul>
                    </div>
                </section>

                {/* 2. Toetatavad tegevused */}
                <section>
                    <h2 className="text-3xl font-bold mb-6 text-[#EAF1F8]">{t('hajaasustus.activities.title')}</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl glass-dark hover:bg-white/8 transition-colors">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <Waves className="text-blue-500" /> {t('hajaasustus.activities.sewerage.title')}
                            </h3>
                            <p className="text-[#9FB4CC] mb-4 text-sm leading-relaxed">
                                {t('hajaasustus.activities.sewerage.desc')}
                            </p>
                            <ul className="text-sm space-y-2 text-[#9FB4CC] ml-1">
                                <li className="flex gap-2 items-start"><span className="text-blue-400">•</span> {t('hajaasustus.activities.sewerage.list.0')}</li>
                                <li className="flex gap-2 items-start"><span className="text-blue-400">•</span> {t('hajaasustus.activities.sewerage.list.1')}</li>
                                <li className="flex gap-2 items-start"><span className="text-blue-400">•</span> {t('hajaasustus.activities.sewerage.list.2')}</li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-2xl glass-dark hover:bg-white/8 transition-colors">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <span className="text-blue-500">💧</span> {t('hajaasustus.activities.water.title')}
                            </h3>
                            <p className="text-[#9FB4CC] mb-4 text-sm leading-relaxed">
                                {t('hajaasustus.activities.water.desc')}
                            </p>
                        </div>

                        {/* Placeholder cards for Road/Electricity to keep layout balanced */}
                        <div className="p-6 rounded-2xl border border-white/20 bg-white/5 grayscale opacity-75">
                            <h3 className="text-lg font-bold mb-2">{t('hajaasustus.activities.road.title')}</h3>
                            <p className="text-xs text-[#9FB4CC]">{t('hajaasustus.activities.road.desc')}</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-white/20 bg-white/5 grayscale opacity-75">
                            <h3 className="text-lg font-bold mb-2">{t('hajaasustus.activities.electricity.title')}</h3>
                            <p className="text-xs text-[#9FB4CC]">{t('hajaasustus.activities.electricity.desc')}</p>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-[#9FB4CC] italic">
                        {t('hajaasustus.activities.note')}
                    </p>
                </section>

                {/* 3. Samm-sammuline juhend */}
                <section id="sammud">
                    <h2 className="text-3xl font-bold mb-8 text-[#EAF1F8]">{t('hajaasustus.steps.title')}</h2>
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">

                        {/* Step 1 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gold-500 glass-dark group-[.is-active]:bg-gold-500 text-aqua-300 group-[.is-active]:text-ink-950 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">1</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/20 glass-dark shadow-sm">
                                <h4 className="font-bold text-lg mb-1 text-[#EAF1F8]">{t('hajaasustus.steps.step1.title')}</h4>
                                <p className="text-sm text-[#9FB4CC]" dangerouslySetInnerHTML={{ __html: t('hajaasustus.steps.step1.desc') }} />
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/20 glass-dark text-[#9FB4CC] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">2</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/20 glass-dark shadow-sm">
                                <h4 className="font-bold text-lg mb-1 text-[#EAF1F8]">{t('hajaasustus.steps.step2.title')}</h4>
                                <p className="text-sm text-[#9FB4CC]">
                                    {t('hajaasustus.steps.step2.desc')}
                                </p>
                                <a href="https://pilv.rtk.ee/s/sH5WcWXY7zs3sb4" target="_blank" rel="noopener noreferrer" className="text-aqua-300 text-xs font-semibold hover:underline mt-2 inline-block">
                                    {t('hajaasustus.steps.step2.link')}
                                </a>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/20 glass-dark text-[#9FB4CC] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">3</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/20 glass-dark shadow-sm">
                                <h4 className="font-bold text-lg mb-1 text-[#EAF1F8]">{t('hajaasustus.steps.step3.title')}</h4>
                                <p className="text-sm text-[#9FB4CC]">
                                    {t('hajaasustus.steps.step3.desc')}
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/20 glass-dark text-[#9FB4CC] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">4</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/20 glass-dark shadow-sm">
                                <h4 className="font-bold text-lg mb-1 text-[#EAF1F8]">{t('hajaasustus.steps.step4.title')}</h4>
                                <p className="text-sm text-[#9FB4CC]">
                                    {t('hajaasustus.steps.step4.desc')}
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 4. Levinud vead */}
                <section className="glass-dark rounded-2xl p-6 md:p-8 border border-red-500/20">
                    <h2 className="text-2xl font-bold mb-4 text-[#EAF1F8] flex items-center gap-2">
                        <AlertTriangle className="text-red-500" />
                        {t('hajaasustus.errors.title')}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex gap-3">
                            <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                            <p className="text-sm text-[#9FB4CC]" dangerouslySetInnerHTML={{ __html: t('hajaasustus.errors.items.0') }} />
                        </div>
                        <div className="flex gap-3">
                            <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                            <p className="text-sm text-[#9FB4CC]" dangerouslySetInnerHTML={{ __html: t('hajaasustus.errors.items.1') }} />
                        </div>
                        <div className="flex gap-3">
                            <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                            <p className="text-sm text-[#9FB4CC]" dangerouslySetInnerHTML={{ __html: t('hajaasustus.errors.items.2') }} />
                        </div>
                        <div className="flex gap-3">
                            <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                            <p className="text-sm text-[#9FB4CC]" dangerouslySetInnerHTML={{ __html: t('hajaasustus.errors.items.3') }} />
                        </div>
                    </div>
                </section>

                {/* 5. Dokumendid ja lingid */}
                <section id="dokumendid">
                    <h2 className="text-2xl font-bold mb-6 text-[#EAF1F8]">{t('hajaasustus.docs.title')}</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <a href="https://rtk.ee/meede-hajaasustuse-programm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-white/20 glass-dark hover:bg-white/10 transition-colors">
                            <FileText className="text-aqua-300 w-5 h-5" />
                            <span className="font-medium text-[#EAF1F8]">{t('hajaasustus.docs.rtk_page')}</span>
                        </a>
                        <a href="https://pilv.rtk.ee/s/sH5WcWXY7zs3sb4" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-white/20 glass-dark hover:bg-white/10 transition-colors">
                            <Download className="text-aqua-300 w-5 h-5" />
                            <span className="font-medium text-[#EAF1F8]">{t('hajaasustus.docs.forms')}</span>
                        </a>
                        <a href="https://www.riigiteataja.ee/akt/107012021004?leiaKehtiv=" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-white/20 glass-dark hover:bg-white/10 transition-colors">
                            <FileText className="text-aqua-300 w-5 h-5" />
                            <span className="font-medium text-[#EAF1F8]">{t('hajaasustus.docs.regulation')}</span>
                        </a>
                        <a href="https://pilv.rtk.ee/s/dXxqdo39WYwmHfR" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-white/20 glass-dark hover:bg-white/10 transition-colors">
                            <Calendar className="text-aqua-300 w-5 h-5" />
                            <span className="font-medium text-[#EAF1F8]">{t('hajaasustus.docs.contacts')}</span>
                        </a>
                    </div>
                </section>

                {/* Grant Form Section */}
                <section className="scroll-mt-24" id="taotlusvorm">
                    <div className="max-w-3xl mx-auto">
                        <GrantContactForm />
                    </div>
                </section>

                {/* FAQ - KKK */}
                <section id="kkk" className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center text-[#EAF1F8]">{t('hajaasustus.faq.title')}</h2>
                    <div className="space-y-4">
                        <details className="group p-4 glass-dark rounded-xl border border-white/15 open:border-gold-500/30 transition-all">
                            <summary className="font-bold text-lg cursor-pointer flex justify-between items-center list-none text-[#EAF1F8]">
                                {t('hajaasustus.faq.q1.q')}
                                <span className="text-aqua-300 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="mt-3 text-[#9FB4CC] text-sm leading-relaxed">
                                {t('hajaasustus.faq.q1.a')}
                            </div>
                        </details>

                        <details className="group p-4 glass-dark rounded-xl border border-white/15 open:border-gold-500/30 transition-all">
                            <summary className="font-bold text-lg cursor-pointer flex justify-between items-center list-none text-[#EAF1F8]">
                                {t('hajaasustus.faq.q2.q')}
                                <span className="text-aqua-300 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="mt-3 text-[#9FB4CC] text-sm leading-relaxed">
                                {t('hajaasustus.faq.q2.a')}
                            </div>
                        </details>

                        <details className="group p-4 glass-dark rounded-xl border border-white/15 open:border-gold-500/30 transition-all">
                            <summary className="font-bold text-lg cursor-pointer flex justify-between items-center list-none text-[#EAF1F8]">
                                {t('hajaasustus.faq.q3.q')}
                                <span className="text-aqua-300 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="mt-3 text-[#9FB4CC] text-sm leading-relaxed">
                                {t('hajaasustus.faq.q3.a')}
                            </div>
                        </details>

                        <details className="group p-4 glass-dark rounded-xl border border-white/15 open:border-gold-500/30 transition-all">
                            <summary className="font-bold text-lg cursor-pointer flex justify-between items-center list-none text-[#EAF1F8]">
                                {t('hajaasustus.faq.q4.q')}
                                <span className="text-aqua-300 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="mt-3 text-[#9FB4CC] text-sm leading-relaxed">
                                {t('hajaasustus.faq.q4.a')}
                            </div>
                        </details>
                    </div>
                </section>

            </div>

            <div className="text-center pb-8 text-xs text-[#9FB4CC]/50">
                {t('hajaasustus.updated')}
            </div>

            <Footer />
        </div>
    )
}
