import list from '../data/downloads.json'
import { useTranslation } from 'react-i18next'
import { FileText } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DownloadsGrid() {
  const { t } = useTranslation()
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  }
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }
  return (
    <div>
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6">{t('downloads.title')}</h3>
      <p className="text-sm sm:text-base text-kingspan-slate mb-4 md:mb-6">{t('downloads.note')}</p>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {list.map((file) => (
          <motion.a
            key={file.title}
            variants={item}
            className="p-3 sm:p-4 rounded-2xl bg-white/80 border hover:shadow-card flex items-center gap-3 transition-all hover:-translate-y-1 hover:border-kingspan-blue/20"
            href={`/downloads/${file.file}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText className="w-5 h-5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="font-medium text-sm sm:text-base truncate">{file.title}</div>
              <div className="text-xs text-kingspan-slate">{file.lang}</div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  )
}
