import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Gallery from './Gallery'

type Props = {
  id: string
  titleKey: string
  descKey: string
  pills?: string[]
}

const pillColors: Record<number, string> = {
  0: 'border-aqua-400/50 text-aqua-300',
  1: 'border-gold-500/50 text-gold-400',
  2: 'border-white/20 text-[#9FB4CC]',
}

export default function ProductSection({ id, titleKey, descKey, pills = [] }: Props) {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)

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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] as [number, number, number, number] }}
      className="min-h-screen py-12 md:py-16 lg:h-screen lg:flex lg:items-center"
    >
      <div className="px-4 md:px-6 w-full h-full">
        <div
          ref={ref}
          className="card-spotlight glass-dark p-4 sm:p-6 md:p-8 h-full flex flex-col"
          style={{ borderRadius: '1.25rem' }}
        >
          <div className="flex flex-col h-full gap-4 md:gap-6">
            <div className="flex-shrink-0">
              <motion.h2
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#EAF1F8] tracking-tight"
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
            </div>
            <div className="flex-1 min-h-0 w-full overflow-hidden rounded-2xl">
              <Gallery folder={id} fullWidth={true} />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
