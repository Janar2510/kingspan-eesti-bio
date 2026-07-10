import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrubText } from './motion/ScrollFX'

/**
 * Trust band: one large scroll-scrubbed statement + a marquee of real
 * installation photos. Reuses the existing `.infinite-scroll` keyframe
 * (already reduced-motion gated in styles.css).
 */
export default function TrustSection() {
  const { t } = useTranslation()
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    fetch('/images/infinite scroll animation/manifest.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((list) => {
        const files = Array.isArray(list) ? list : []
        setImages(files.map((f: string) => `/images/infinite scroll animation/${f.trim()}`))
      })
      .catch(() => setImages([]))
  }, [])

  const marquee = [...images, ...images]

  return (
    <section id="trust" className="surface-base py-24 md:py-32 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <ScrubText
          text={t('trust.statement')}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#EAF1F8] leading-snug tracking-tight"
        />
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#9FB4CC]">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold-500" />
            {t('trust.cert')}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-aqua-400" />
            {t('trust.installs')}
          </span>
        </div>
      </div>

      {images.length > 0 && (
        <div className="mt-14 md:mt-20 overflow-hidden" aria-label={t('trust.gallery_label')}>
          <div className="infinite-scroll flex gap-4 md:gap-6 w-max">
            {marquee.map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-40 h-28 sm:w-56 sm:h-36 md:w-72 md:h-44 rounded-2xl overflow-hidden border border-white/10"
                aria-hidden={i >= images.length}
              >
                <img
                  src={src}
                  alt={i < images.length ? t('trust.gallery_alt') : ''}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
