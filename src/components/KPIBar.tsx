import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { CalendarCheck, Wrench, Headset, BadgeCheck } from 'lucide-react'

export default function KPIBar() {
  const { t } = useTranslation()
  const items = [
    { key: 'kpi.a', delay: 0, icon: CalendarCheck },
    { key: 'kpi.b', delay: 0.08, icon: Wrench },
    { key: 'kpi.c', delay: 0.16, icon: Headset },
    { key: 'kpi.d', delay: 0.24, icon: BadgeCheck }
  ]
  return (
    <section className="surface-base py-10 md:py-14 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-center text-xs sm:text-sm md:text-base">
        {items.map((item) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: item.delay, ease: 'easeOut' }}
            whileHover={{ y: -4 }}
            className="glass-dark p-4 sm:p-5"
          >
            <item.icon className="w-5 h-5 md:w-6 md:h-6 text-aqua-300 mx-auto mb-2" />
            <span className="inline-block w-full text-[#EAF1F8] font-semibold">
              {t(item.key)}
            </span>
            <span className="block mt-2 h-[2px] w-12 mx-auto rule-gold rounded-full" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}