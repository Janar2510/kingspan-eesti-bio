import list from '../data/downloads.json'
import { useTranslation } from 'react-i18next'
import { FileText } from 'lucide-react'

export default function DownloadsGrid() {
  const { t } = useTranslation()
  return (
    <div>
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6">{t('downloads.title')}</h3>
      <p className="text-sm sm:text-base text-kingspan-slate mb-4 md:mb-6">{t('downloads.note')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {list.map((item) => (
          <a
            key={item.title}
            className="p-3 sm:p-4 rounded-2xl bg-white/80 border hover:shadow-card flex items-center gap-3 transition-shadow"
            href={`/downloads/${item.file}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText className="w-5 h-5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="font-medium text-sm sm:text-base truncate">{item.title}</div>
              <div className="text-xs text-kingspan-slate">{item.lang}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
