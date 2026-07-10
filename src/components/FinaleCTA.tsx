import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { Magnetic } from './motion/ScrollFX'

/**
 * The "Action" moment: a full-width drenched band that funnels the reader
 * into the consultation form (directly below) or a phone call.
 */
export default function FinaleCTA() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()

  return (
    <section
      aria-labelledby="finale-title"
      className="relative overflow-hidden py-24 md:py-36"
      style={{
        background:
          'radial-gradient(90% 130% at 50% 115%, rgba(198,146,20,0.28), rgba(0,17,31,0) 60%), ' +
          'radial-gradient(70% 100% at 15% -10%, rgba(10,75,133,0.45), rgba(0,17,31,0) 55%), ' +
          'var(--bg-deep)',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <motion.h2
          id="finale-title"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#EAF1F8] tracking-tight"
        >
          {t('finale.title')}
        </motion.h2>
        <p className="mt-5 text-base md:text-lg text-[#9FB4CC] max-w-2xl mx-auto">
          {t('finale.sub')}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Magnetic>
            <a href="#contact" className="btn-gold text-base md:text-lg px-10 py-5">
              {t('finale.cta')}
            </a>
          </Magnetic>
          <a
            href="tel:+37256103001"
            className="inline-flex items-center gap-2 text-[#EAF1F8] font-semibold hover:text-gold-400 transition-colors"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span>{t('finale.call')} +372 5610 3001</span>
          </a>
        </div>
      </div>
    </section>
  )
}
