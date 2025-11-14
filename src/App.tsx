import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Droplets, Leaf, Shield, Waves, Download, Languages } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import DownloadsGrid from './components/DownloadsGrid'
import ConsultationForm from './components/ConsultationForm'
import ProductSection from './components/ProductSection'
import KPIBar from './components/KPIBar'

export default function App() {
  const { t } = useTranslation()
  const heroRef = useRef<HTMLDivElement>(null)
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

  return (
    <div className="text-kingspan-navy">
      <Header />

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden h-screen w-screen">
        <div
          className="absolute inset-0 -z-10 animate-shimmer"
          style={{ 
            backgroundImage: 'radial-gradient(60% 120% at 20% 10%, rgba(0,58,112,0.18), rgba(255,255,255,0)), radial-gradient(80% 140% at 80% 90%, rgba(198,146,20,0.18), rgba(255,255,255,0))',
            backgroundSize: '200% 100%'
          }}
        />
        <div className="absolute inset-0 -z-10">
          <img 
            src="/images/hero/hero-biological.png" 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-full flex items-center px-4 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto w-full">
            <div className="w-full md:w-1/2">
              <div style={{ transform: `translateY(${offset * 0.5}px)` }}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">{t('hero.title')}</h1>
                <p className="mt-3 md:mt-4 text-base sm:text-lg md:text-xl text-white drop-shadow-md">{t('hero.sub')}</p>
                <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4">
                  <a href="#contact" className="px-6 py-3 rounded-3xl bg-kingspan-blue text-white shadow-card hover:opacity-90 text-center sm:text-left text-sm md:text-base">
                    {t('hero.ctaPrimary')}
                  </a>
                  <a href="#downloads" className="px-6 py-3 rounded-3xl border border-kingspan-gold text-kingspan-blue bg-white/70 hover:bg-white flex items-center justify-center gap-2 text-sm md:text-base">
                    <Download className="w-4 h-4" /> {t('hero.ctaSecondary')}
                  </a>
                </div>
                <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 text-white drop-shadow-md text-sm md:text-base">
                  <span className="inline-flex items-center gap-2"><Waves className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" /> <span className="whitespace-nowrap">Quiet & odour‑free</span></span>
                  <span className="inline-flex items-center gap-2"><Leaf className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" /> Low energy</span>
                  <span className="inline-flex items-center gap-2"><Shield className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" /> Durable GRP/PE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <KPIBar />

      {/* Products */}
      <ProductSection
        id="biodisc"
        titleKey="products.biodisc_title"
        descKey="products.biodisc_desc"
        pills={['Quiet','Odour‑free','RBC']}
      />
      <ProductSection
        id="bioficient"
        titleKey="products.bioficient_title"
        descKey="products.bioficient_desc"
        pills={['Fluidised bed','Low energy','Automated']}
      />
      <ProductSection
        id="bioair"
        titleKey="products.bioair_title"
        descKey="products.bioair_desc"
        pills={['Activated sludge','97.5% BOD5','IPS (opt.)']}
      />
      <ProductSection
        id="biotec"
        titleKey="products.biotec_title"
        descKey="products.biotec_desc"
        pills={['Off‑grid','No electricity','Gravity/Pressure']}
      />

      {/* Rainwater & Pumping */}
      <ProductSection
        id="rainstore"
        titleKey="products.rainstore_title"
        descKey="products.rainstore_desc"
        pills={['Save up to 50%','Low‑profile','Kits']}
      />
      <ProductSection
        id="psd1"
        titleKey="products.psd1_title"
        descKey="products.psd1_desc"
        pills={['Telescopic','A15 hatch','Pedrollo']}
      />

      {/* Downloads */}
      <section id="downloads" className="py-12 md:py-16 bg-white/60">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <DownloadsGrid />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <ConsultationForm />
        </div>
      </section>

      <Footer />
    </div>
  )
}
