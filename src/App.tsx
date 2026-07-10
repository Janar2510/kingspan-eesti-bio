import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import DownloadsGrid from './components/DownloadsGrid'
import ConsultationForm from './components/ConsultationForm'
import ProductSection from './components/ProductSection'
import KPIBar from './components/KPIBar'
import SEOHead from './components/SEOHead'
import FocusRailGallery from './components/FocusRailGallery'
import TrustSection from './components/TrustSection'
import ProcessSection from './components/ProcessSection'
import FinaleCTA from './components/FinaleCTA'
import { Magnetic } from './components/motion/ScrollFX'

function FadeIn({ children, delay = 0, duration = 1000, className = '' }: {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])
  return (
    <div
      className={`transition-opacity ${className}`}
      style={{ opacity: visible ? 1 : 0, transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  )
}

function AnimatedHeading({ text, className = '', style }: {
  text: string
  className?: string
  style?: CSSProperties
}) {
  const [visible, setVisible] = useState(false)
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), reduceMotion ? 0 : 200)
    return () => clearTimeout(timer)
  }, [reduceMotion])
  const lines = text.split('\n')
  const charDelay = reduceMotion ? 0 : 30
  return (
    <div className={className} style={style} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, li) => {
        const prevLen = lines.slice(0, li).reduce((s, l) => s + l.length, 0)
        const words = line.split(' ')
        let charCount = 0
        return (
          <div key={li}>
            {words.map((word, wi) => {
              const wordStart = charCount
              charCount += word.length + 1
              return (
                <span key={wi}>
                  <span className="inline-block" style={{ whiteSpace: 'nowrap' }}>
                    {word.split('').map((char, ci) => {
                      const delay = reduceMotion ? 0 : 200 + (prevLen + wordStart + ci) * charDelay
                      return (
                        <span
                          key={ci}
                          className="inline-block"
                          style={{
                            opacity: visible ? 1 : 0,
                            transform: reduceMotion ? 'none' : visible ? 'translateX(0)' : 'translateX(-18px)',
                            transition: reduceMotion ? 'opacity 200ms' : `opacity 500ms ${delay}ms, transform 500ms ${delay}ms`,
                          }}
                        >
                          {char}
                        </span>
                      )
                    })}
                  </span>
                  {wi < words.length - 1 ? ' ' : ''}
                </span>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default function App() {
  const { t } = useTranslation()
  const pills = (key: string) => t(key, { returnObjects: true }) as string[]
  const moreProductsRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [videoFailed, setVideoFailed] = useState(false)
  const reduceMotion = useReducedMotion()

  // Hero exit parallax — video recedes slower than the page, content lifts
  // away and the scene darkens as the user scrolls past the fold.
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroVideoY = useTransform(heroProgress, [0, 1], ['0%', reduceMotion ? '0%' : '22%'])
  const heroDim = useTransform(heroProgress, [0, 0.9], [0, reduceMotion ? 0 : 0.65])
  const heroContentY = useTransform(heroProgress, [0, 1], [0, reduceMotion ? 0 : -70])
  const heroContentOpacity = useTransform(heroProgress, [0, 0.75], [1, reduceMotion ? 1 : 0])

  // Callback ref (not useEffect): fires synchronously at commit, before the
  // browser's first paint. Safari evaluates autoplay eligibility on paint —
  // if `muted` is only set in a useEffect it can lose that race and fall
  // back to a paused/poster state with a play affordance.
  const setVideoRef = (el: HTMLVideoElement | null) => {
    videoRef.current = el
    if (!el) return
    el.muted = true
    el.play().catch(() => {})
  }

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
      <SEOHead />
      <Header />

      {/* Hero — full-screen video, bottom-aligned content, exit parallax */}
      <section ref={heroRef} className="relative min-h-[100svh] w-full flex flex-col overflow-hidden">
        <div className="absolute inset-0 water-field surface-deep" />
        {!videoFailed && (
          <motion.div style={{ y: heroVideoY }} className="absolute inset-0">
            <video
              ref={setVideoRef}
              autoPlay
              loop
              muted
              playsInline
              poster="/images/hero/hero-main.webp"
              onError={() => setVideoFailed(true)}
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            >
              <source src="/videos/hero-kenburns.mp4" type="video/mp4" />
            </video>
          </motion.div>
        )}

        {/* Scroll-linked darkening as hero exits */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: heroDim }}
          className="pointer-events-none absolute inset-0 z-[2] bg-ink-950"
        />

        {/* Drifting cloud layers */}
        <div aria-hidden="true" className="cloud-layer pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          <div className="cloud cloud-1" />
          <div className="cloud cloud-2" />
          <div className="cloud cloud-3" />
          <div className="cloud cloud-4" />
          <div className="cloud cloud-5" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col px-6 md:px-12 lg:px-16 pt-6">
          <div className="flex-1" />
          <motion.div style={{ y: heroContentY, opacity: heroContentOpacity }} className="pb-4 md:pb-6 lg:pb-10">
            <div className="lg:grid lg:grid-cols-2 lg:items-end lg:gap-8">
              <div className="max-w-3xl">
                <AnimatedHeading
                  text={t('hero.title')}
                  className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white mb-3"
                  style={{ letterSpacing: '-0.04em' }}
                />
                <FadeIn delay={800} duration={1000}>
                  <p className="text-base md:text-lg text-[#9FB4CC] mb-5 max-w-xl">
                    {t('hero.sub')}
                  </p>
                </FadeIn>
                <FadeIn delay={1200} duration={1000}>
                  <div className="flex flex-wrap items-center gap-4">
                    <Magnetic>
                      <a href="#contact" className="btn-gold">
                        {t('hero.ctaPrimary')}
                      </a>
                    </Magnetic>
                    <a
                      href="#biodisc"
                      className="liquid-glass border border-white/20 text-white px-8 py-4 rounded-pill font-semibold hover:bg-white hover:text-kingspan-navy transition-colors"
                    >
                      {t('hero.ctaProducts')}
                    </a>
                  </div>
                </FadeIn>
              </div>

              <div className="flex items-end justify-start lg:justify-end mt-8 lg:mt-0">
                <FadeIn delay={1400} duration={1000}>
                  <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                    <p className="text-lg md:text-xl lg:text-2xl font-light text-white">
                      BioDisc · BioAir · BioFicient
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <KPIBar />

      {/* Products */}
      <div className="surface-base">
        <ProductSection
          id="biodisc"
          titleKey="products.biodisc_title"
          descKey="products.biodisc_desc"
          pills={pills('products.biodisc_pills')}
          accent="aqua"
          brochureHref="/downloads/Majapidamisreoveepuhasti BioDisc.pdf"
        />
        <ProductSection
          id="bioficient"
          titleKey="products.bioficient_title"
          descKey="products.bioficient_desc"
          pills={pills('products.bioficient_pills')}
          accent="aqua"
          brochureHref="/downloads/Kommertsreoveepuhasti BioFicient.pdf"
        />
        <ProductSection
          id="bioair"
          titleKey="products.bioair_title"
          descKey="products.bioair_desc"
          pills={pills('products.bioair_pills')}
          accent="aqua"
          brochureHref="/downloads/BioAir.pdf"
        />
        <ProductSection
          id="biotec"
          titleKey="products.biotec_title"
          descKey="products.biotec_desc"
          pills={pills('products.biotec_pills')}
          accent="aqua"
          brochureHref="/downloads/BioTecFlo.pdf"
        />

        {/* Rainwater & Pumping */}
        <ProductSection
          id="rainstore"
          titleKey="products.rainstore_title"
          descKey="products.rainstore_desc"
          pills={pills('products.rainstore_pills')}
          accent="gold"
          brochureHref="/downloads/RainStoreFlat.pdf"
        />
        <ProductSection
          id="psd1"
          titleKey="products.psd1_title"
          descKey="products.psd1_desc"
          pills={pills('products.psd1_pills')}
          accent="gold"
          brochureHref="/downloads/PSD1.pdf"
        />
      </div>

      <TrustSection />
      <ProcessSection />

      {/* Veel tooteid — pinned showcase: card holds while the page scrolls through */}
      <section id="more-products" className="surface-deep lg:h-[180vh]">
        <div className="min-h-screen py-12 md:py-16 lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center lg:py-0">
          <div className="px-4 md:px-6 w-full max-w-6xl mx-auto">
            <div ref={moreProductsRef} className="product-spotlight product-spotlight--gold p-4 sm:p-6 md:p-8 h-[70vh] flex flex-col">
              <div className="mb-6 flex-shrink-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#EAF1F8]">{t('products.more_products_title')}</h2>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                <FocusRailGallery />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section id="downloads" className="surface-deep py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <DownloadsGrid />
        </div>
      </section>

      <FinaleCTA />

      {/* Contact */}
      <section id="contact" className="surface-base py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <ConsultationForm />
        </div>
      </section>

      <Footer />
    </div>
  )
}
