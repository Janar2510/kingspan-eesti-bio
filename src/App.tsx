import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Droplets, Leaf, Shield, Waves, Download, Languages } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import DownloadsGrid from './components/DownloadsGrid'
import ConsultationForm from './components/ConsultationForm'
import ProductSection from './components/ProductSection'
import KPIBar from './components/KPIBar'
import SEOHead from './components/SEOHead'
import FocusRailGallery from './components/FocusRailGallery'
import GradualSpacing from './components/GradualSpacing'

export default function App() {
  const { t } = useTranslation()
  const heroRef = useRef<HTMLDivElement>(null)
  const moreProductsRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setOffset(Math.max(-40, Math.min(40, (window.innerHeight - rect.top) * 0.02)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = moreProductsRef.current
    if (!el) return
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      el.style.setProperty('--pointer-x', x + 'px')
      el.style.setProperty('--pointer-y', y + 'px')
    }
    el.addEventListener('mousemove', onMouseMove)
    return () => el.removeEventListener('mousemove', onMouseMove)
  }, [])

  // Handle hash scrolling on mount
  useEffect(() => {
    const hash = window.location.hash
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    const navType = navEntry?.type
    const legacyNavType = (performance as any).navigation?.type
    const isReload = navType === 'reload' || legacyNavType === 1

    if (hash && isReload) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    if (hash) {
      // Small timeout to ensure content is rendered
      const timer = setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div className="text-kingspan-navy relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-20 brand-ambient" />
      <SEOHead />
      <Header />

      {/* Hero */}
      <section ref={heroRef} className="surface-deep relative overflow-hidden min-h-[100svh] w-full">
        {/* Base photo, dimmed for legibility */}
        <div className="absolute inset-0 -z-30">
          <img
            src="/images/hero/hero-biological.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        {/* Animated water gradient field */}
        <div className="water-field absolute inset-0 -z-20" aria-hidden="true" />
        {/* Readability scrim: deep navy from left + bottom */}
        <div
          className="absolute inset-0 -z-10"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(0,17,31,0.88) 0%, rgba(0,17,31,0.55) 45%, rgba(0,17,31,0.15) 100%), linear-gradient(0deg, rgba(0,17,31,0.85) 0%, rgba(0,17,31,0) 55%)',
          }}
        />
        <div className="h-full flex items-center px-4 md:px-6 relative z-10 pt-10 sm:pt-12 md:pt-16">
          <div className="max-w-6xl mx-auto w-full">
            <div className="w-full md:w-1/2 lg:w-[55%] text-center md:text-left">
              <div style={{ transform: `translateY(${offset * 0.5}px)` }}>
                <GradualSpacing
                  text={t('hero.title')}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight"
                  containerClassName="justify-center md:justify-start"
                />
                <p className="mt-4 md:mt-5 text-base sm:text-lg md:text-xl text-[#9FB4CC] max-w-xl">{t('hero.sub')}</p>
                <div className="mt-7 md:mt-9 flex flex-col sm:flex-row gap-3 md:gap-4">
                  <a href="#contact" className="btn-gold text-center text-sm md:text-base">
                    {t('hero.ctaPrimary')}
                  </a>
                  <a href="#downloads" className="btn-outline-light inline-flex items-center justify-center gap-2 text-sm md:text-base">
                    <Download className="w-4 h-4" /> {t('hero.ctaSecondary')}
                  </a>
                </div>
                <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 text-sm md:text-base">
                  <span className="glass-dark inline-flex items-center gap-2 px-4 py-2 text-[#EAF1F8]"><Waves className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-aqua-300" /> <span className="whitespace-nowrap">Quiet &amp; odour‑free</span></span>
                  <span className="glass-dark inline-flex items-center gap-2 px-4 py-2 text-[#EAF1F8]"><Leaf className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-aqua-300" /> Low energy</span>
                  <span className="glass-dark inline-flex items-center gap-2 px-4 py-2 text-[#EAF1F8]"><Shield className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-gold-400" /> Durable GRP/PE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <KPIBar />

      {/* Products */}
      <div className="surface-base">
        <ProductSection
          id="biodisc"
          titleKey="products.biodisc_title"
          descKey="products.biodisc_desc"
          pills={['Quiet', 'Odour‑free', 'RBC']}
        />
        <ProductSection
          id="bioficient"
          titleKey="products.bioficient_title"
          descKey="products.bioficient_desc"
          pills={['Fluidised bed', 'Low energy', 'Automated']}
        />
        <ProductSection
          id="bioair"
          titleKey="products.bioair_title"
          descKey="products.bioair_desc"
          pills={['Activated sludge', '97.5% BOD5', 'IPS (opt.)']}
        />
        <ProductSection
          id="biotec"
          titleKey="products.biotec_title"
          descKey="products.biotec_desc"
          pills={['Off‑grid', 'No electricity', 'Gravity/Pressure']}
        />

        {/* Rainwater & Pumping */}
        <ProductSection
          id="rainstore"
          titleKey="products.rainstore_title"
          descKey="products.rainstore_desc"
          pills={['Save up to 50%', 'Low‑profile', 'Kits']}
        />
        <ProductSection
          id="psd1"
          titleKey="products.psd1_title"
          descKey="products.psd1_desc"
          pills={['Telescopic', 'A15 hatch', 'Pedrollo']}
        />
      </div>

      {/* Veel tooteid */}
      <section id="more-products" className="surface-deep min-h-screen py-12 md:py-16 lg:h-screen lg:flex lg:items-center">
        <div className="px-4 md:px-6 w-full h-full flex flex-col gap-6 md:gap-8">
          <div ref={moreProductsRef} className="glass-dark card-spotlight p-4 sm:p-6 md:p-8 h-[70vh] flex flex-col">
            <div className="mb-6 flex-shrink-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#EAF1F8]">{t('products.more_products_title')}</h2>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              <FocusRailGallery />
            </div>
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section id="downloads" className="surface-deep py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <DownloadsGrid />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="surface-base py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <ConsultationForm />
        </div>
      </section>

      <Footer />
    </div>
  )
}
