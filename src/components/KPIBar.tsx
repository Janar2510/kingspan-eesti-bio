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
    <section className="py-6 md:py-8 bg-white/70 border-y border-kingspan-cloud/60">
      <div className="px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-center text-xs sm:text-sm md:text-base text-kingspan-slate">
        {items.map((item) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: item.delay, ease: 'easeOut' }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="kpi-border"
          >
            <div className="kpi-card p-3 sm:p-4 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md">
              <item.icon className="w-4 h-4 md:w-5 md:h-5 text-kingspan-blue mx-auto mb-2" />
              <span className="inline-block w-full text-kingspan-navy font-semibold">
                {t(item.key)}
              </span>
              <span className="block mt-1 h-[2px] w-12 mx-auto bg-gradient-to-r from-kingspan-blue/70 to-kingspan-gold/70 rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}