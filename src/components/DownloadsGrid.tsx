import list from '../data/downloads.json'
import { useTranslation } from 'react-i18next'
import { FileText } from 'lucide-react'

export default function DownloadsGrid() {
  const { t } = useTranslation()
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">{t('downloads.title')}</h3>
      <p className="text-kingspan-slate mb-4">{t('downloads.note')}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((item) => (
          <a key={item.title} className="p-4 rounded-2xl bg-white/80 border hover:shadow-card flex items-center gap-3" href={`/downloads/${item.file}`}>
            <FileText className="w-5 h-5" />
            <div>
              <div className="font-medium">{item.title}</div>
              <div className="text-xs text-kingspan-slate">{item.lang}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
