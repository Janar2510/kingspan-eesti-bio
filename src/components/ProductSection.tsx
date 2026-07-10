import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Gallery from './Gallery'

const PRODUCT_BG_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_102933_4e8f73b5-775a-4179-b2fb-472f59063dcd.mp4'

type Props = {
  id: string
  titleKey: string
  descKey: string
  pills?: string[]
  accent?: 'aqua' | 'gold'
  brochureHref?: string
}

const pillColors: Record<number, string> = {
  0: 'border-aqua-400/50 text-aqua-300',
  1: 'border-gold-500/50 text-gold-400',
  2: 'border-white/20 text-[#9FB4CC]',
}

export default function ProductSection({ id, titleKey, descKey, pills = [], accent = 'aqua', brochureHref }: Props) {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--pointer-x', (e.clientX - rect.left) + 'px')
      el.style.setProperty('--pointer-y', (e.clientY - rect.top) + 'px')
    }
    el.addEventListener('mousemove', onMouseMove)
    return () => el.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0.4 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] as [number, number, number, number] }}
      className="relative overflow-hidden min-h-screen py-12 md:py-16 lg:h-screen lg:flex lg:items-center"
    >
      {/* Shared product background video */}
      <video
        ref={(el) => { if (el) { el.muted = true; el.play().catch(() => {}) } }}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src={PRODUCT_BG_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-ink-950/55" aria-hidden="true" />

      <div className="relative z-10 px-4 md:px-6 w-full h-full max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`product-spotlight product-spotlight--${accent} p-4 sm:p-6 md:p-8 h-full flex flex-col`}
        >
          <div className="flex flex-col h-full gap-4 md:gap-6">
            <div className="flex-shrink-0">
              <motion.h2
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#EAF1F8] tracking-tight"
              >
                {t(titleKey)}
              </motion.h2>
              <p className="mt-2 md:mt-3 text-sm sm:text-base md:text-lg text-[#9FB4CC] max-w-2xl">
                {t(descKey)}
              </p>
              {pills.length > 0 && (
                <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
                  {pills.map((p, i) => (
                    <span
                      key={p}
                      className={`px-3 py-1 rounded-pill border text-xs sm:text-sm font-medium ${pillColors[i % 3]}`}
                      style={{ backdropFilter: 'blur(8px)' }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}
              {brochureHref && (
                <a
                  href={brochureHref}
                  target={brochureHref.startsWith('#') ? undefined : '_blank'}
                  rel={brochureHref.startsWith('#') ? undefined : 'noopener noreferrer'}
                  className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors w-fit ${
                    accent === 'gold' ? 'text-gold-400 hover:text-gold-300' : 'text-aqua-300 hover:text-aqua-200'
                  }`}
                >
                  {t('products.cta_more')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>
            <motion.div
              initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0 round 1rem)' }}
              whileInView={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0 round 1rem)' }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] as [number, number, number, number] }}
              className="flex-1 min-h-0 w-full overflow-hidden rounded-2xl"
            >
              <Gallery folder={id} fullWidth={true} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
