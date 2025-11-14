import { useTranslation } from 'react-i18next'
import { Languages } from 'lucide-react'

export default function Header() {
  const { i18n, t } = useTranslation()

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ee' ? 'en' : 'ee')
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-kingspan-cloud">
      <div className="max-w-6xl mx-auto px-6 h-28 flex items-center justify-between">
        <a href="/" className="flex items-center h-full">
          <img 
            src="/images/kingspan-logo.png" 
            alt="Kingspan Eesti BIO" 
            className="h-24 w-auto object-contain"
          />
        </a>
        <nav className="flex items-center gap-6 text-sm">
          <a href="/#biodisc">BioDisc</a>
          <a href="/#bioficient">BioFicient</a>
          <a href="/#bioair">BioAir</a>
          <a href="/#biotec">BioTec Flo</a>
          <a href="/#rainstore">RainStore</a>
          <a href="/#psd1">PSD1</a>
          <a href="/#downloads">{t('navigation.downloads')}</a>
          <a href="/#contact">{t('navigation.contact')}</a>
          <a href="/about" className="px-3 py-1.5 rounded-xl border border-kingspan-cloud hover:bg-kingspan-cloud text-xs uppercase tracking-wide">
            {t('navigation.about')}
          </a>
          <button onClick={toggle} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-kingspan-cloud hover:bg-kingspan-cloud">
            <Languages className="w-4 h-4" />
            <span>{i18n.language === 'ee' ? 'EN' : 'EE'}</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
