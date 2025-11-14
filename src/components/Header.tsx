import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Languages, Menu, X } from 'lucide-react'

export default function Header() {
  const { i18n, t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ee' ? 'en' : 'ee')
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-kingspan-cloud">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-20 md:h-28 flex items-center justify-between">
        <a href="/" className="flex items-center h-full">
          <img 
            src="/images/kingspan-logo.png" 
            alt="Kingspan Eesti BIO" 
            className="h-16 md:h-24 w-auto object-contain"
          />
        </a>
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm">
          <a href="/#biodisc" className="hover:text-kingspan-blue transition-colors">BioDisc</a>
          <a href="/#bioficient" className="hover:text-kingspan-blue transition-colors">BioFicient</a>
          <a href="/#bioair" className="hover:text-kingspan-blue transition-colors">BioAir</a>
          <a href="/#biotec" className="hover:text-kingspan-blue transition-colors">BioTec Flo</a>
          <a href="/#rainstore" className="hover:text-kingspan-blue transition-colors">RainStore</a>
          <a href="/#psd1" className="hover:text-kingspan-blue transition-colors">PSD1</a>
          <a href="/#downloads" className="hover:text-kingspan-blue transition-colors">{t('navigation.downloads')}</a>
          <a href="/#contact" className="hover:text-kingspan-blue transition-colors">{t('navigation.contact')}</a>
          <a href="/about" className="px-3 py-1.5 rounded-xl border border-kingspan-cloud hover:bg-kingspan-cloud text-xs uppercase tracking-wide">
            {t('navigation.about')}
          </a>
          <button onClick={toggle} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-kingspan-cloud hover:bg-kingspan-cloud">
            <Languages className="w-4 h-4" />
            <span>{i18n.language === 'ee' ? 'EN' : 'EE'}</span>
          </button>
        </nav>
        
        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-2">
          <button onClick={toggle} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-kingspan-cloud hover:bg-kingspan-cloud">
            <Languages className="w-4 h-4" />
            <span className="text-xs">{i18n.language === 'ee' ? 'EN' : 'EE'}</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-kingspan-cloud hover:bg-kingspan-cloud"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-kingspan-cloud bg-white">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
            <a href="/#biodisc" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-kingspan-blue transition-colors">BioDisc</a>
            <a href="/#bioficient" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-kingspan-blue transition-colors">BioFicient</a>
            <a href="/#bioair" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-kingspan-blue transition-colors">BioAir</a>
            <a href="/#biotec" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-kingspan-blue transition-colors">BioTec Flo</a>
            <a href="/#rainstore" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-kingspan-blue transition-colors">RainStore</a>
            <a href="/#psd1" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-kingspan-blue transition-colors">PSD1</a>
            <a href="/#downloads" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-kingspan-blue transition-colors">{t('navigation.downloads')}</a>
            <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-kingspan-blue transition-colors">{t('navigation.contact')}</a>
            <a href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-xl border border-kingspan-cloud hover:bg-kingspan-cloud text-xs uppercase tracking-wide inline-block">
              {t('navigation.about')}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
