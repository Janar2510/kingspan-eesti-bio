import list from '../data/downloads.json'
import { useTranslation } from 'react-i18next'
import { FileText, Download } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DownloadsGrid() {
  const { t } = useTranslation()

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] as [number, number, number, number] } },
  }

  return (
    <div>
      <div className="mb-8 md:mb-10">
        <span className="overline text-gold-500 tracking-[0.18em] uppercase text-xs font-medium block mb-3">
          Brochures & Specs
        </span>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#EAF1F8] tracking-tight">
          {t('downloads.title')}
        </h3>
        <p className="mt-2 text-sm sm:text-base text-[#9FB4CC] max-w-xl">
          {t('downloads.note')}
        </p>
        <div className="mt-4 rule-gold w-12 rounded-full" />
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {list.map((file) => (
          <motion.a
            key={file.title}
            variants={item}
            whileHover={{ y: -4 }}
            className="glass-dark group flex items-center gap-3 p-4 cursor-pointer transition-colors"
            href={`/downloads/${file.file}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText className="w-5 h-5 flex-shrink-0 text-aqua-300 group-hover:text-gold-400 transition-colors" />
            <div className="min-w-0 flex-1">
              <div className="font-medium text-sm sm:text-base text-[#EAF1F8] truncate">{file.title}</div>
              <div className="text-xs text-[#9FB4CC] mt-0.5">{file.lang}</div>
            </div>
            <Download className="w-4 h-4 flex-shrink-0 text-[#9FB4CC] opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
        ))}
      </motion.div>
    </div>
  )
}
