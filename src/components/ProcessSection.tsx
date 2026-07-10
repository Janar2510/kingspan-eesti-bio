import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * "How it works" — a real 4-step sequence (consultation → sizing →
 * installation → maintenance), so numbered markers carry meaning here.
 */
export default function ProcessSection() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const steps = [1, 2, 3, 4] as const

  return (
    <section id="process" className="surface-deep py-24 md:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#EAF1F8] tracking-tight">
          {t('process.title')}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#9FB4CC] max-w-xl">{t('process.sub')}</p>
        <div className="mt-4 rule-gold w-12 rounded-full" />

        <ol className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 list-none">
          {steps.map((n, i) => (
            <motion.li
              key={n}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.1, ease: [0.65, 0, 0.35, 1] }}
              className="relative"
            >
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gold-500 text-gold-400 font-black text-lg flex-shrink-0">
                  {n}
                </span>
                {i < steps.length - 1 && (
                  <span aria-hidden="true" className="hidden lg:block flex-1 h-px bg-white/10" />
                )}
              </div>
              <h3 className="mt-5 text-lg md:text-xl font-bold text-[#EAF1F8]">
                {t(`process.step${n}.title`)}
              </h3>
              <p className="mt-2 text-sm md:text-base text-[#9FB4CC] leading-relaxed">
                {t(`process.step${n}.desc`)}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
