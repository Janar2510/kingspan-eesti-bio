import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Languages, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const { i18n, t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ee' ? 'en' : 'ee')
  }

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/40 backdrop-blur-xl shadow-lg border-b border-white/10' 
          : 'bg-white/30 backdrop-blur-md border-b border-white/5'
      }`}
      style={{
        background: scrolled 
          ? 'rgba(255, 255, 255, 0.4)' 
          : 'rgba(255, 255, 255, 0.3)',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(12px) saturate(150%)',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(12px) saturate(150%)',
        boxShadow: scrolled 
          ? '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)' 
          : '0 4px 16px 0 rgba(0, 0, 0, 0.03), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-20 md:h-28 flex items-center justify-between">
        <a href="/" className="flex items-center h-full">
          <img 
            src="/images/kingspan-logo.png" 
            alt="Kingspan Eesti BIO" 
            className="h-16 md:h-24 w-auto object-contain"
          />
        </a>
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm">
          <motion.a 
            href="/#biodisc" 
            className="hover:text-kingspan-blue transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BioDisc
          </motion.a>
          <motion.a 
            href="/#bioficient" 
            className="hover:text-kingspan-blue transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BioFicient
          </motion.a>
          <motion.a 
            href="/#bioair" 
            className="hover:text-kingspan-blue transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BioAir
          </motion.a>
          <motion.a 
            href="/#biotec" 
            className="hover:text-kingspan-blue transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BioTec Flo
          </motion.a>
          <motion.a 
            href="/#rainstore" 
            className="hover:text-kingspan-blue transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            RainStore
          </motion.a>
          <motion.a 
            href="/#psd1" 
            className="hover:text-kingspan-blue transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            PSD1
          </motion.a>
          <motion.a 
            href="/#downloads" 
            className="hover:text-kingspan-blue transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('navigation.downloads')}
          </motion.a>
          <motion.a 
            href="/#contact" 
            className="hover:text-kingspan-blue transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('navigation.contact')}
          </motion.a>
          <motion.a 
            href="/calculator" 
            className="px-3 py-1.5 rounded-xl border border-kingspan-cloud hover:bg-kingspan-cloud text-xs uppercase tracking-wide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('navigation.calculator')}
          </motion.a>
          <motion.a 
            href="/about" 
            className="px-3 py-1.5 rounded-xl border border-kingspan-cloud hover:bg-kingspan-cloud text-xs uppercase tracking-wide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('navigation.about')}
          </motion.a>
          <motion.button 
            onClick={toggle} 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-kingspan-cloud hover:bg-kingspan-cloud"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Languages className="w-4 h-4" />
            <span>{i18n.language === 'ee' ? 'EN' : 'EE'}</span>
          </motion.button>
        </nav>
        
        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-2">
          <motion.button 
            onClick={toggle} 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-kingspan-cloud hover:bg-kingspan-cloud"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Languages className="w-4 h-4" />
            <span className="text-xs">{i18n.language === 'ee' ? 'EN' : 'EE'}</span>
          </motion.button>
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-kingspan-cloud hover:bg-kingspan-cloud"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-white/20 overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
              <motion.a 
                href="/#biodisc" 
                onClick={() => setMobileMenuOpen(false)} 
                className="py-2 hover:text-kingspan-blue transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                BioDisc
              </motion.a>
              <motion.a 
                href="/#bioficient" 
                onClick={() => setMobileMenuOpen(false)} 
                className="py-2 hover:text-kingspan-blue transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                BioFicient
              </motion.a>
              <motion.a 
                href="/#bioair" 
                onClick={() => setMobileMenuOpen(false)} 
                className="py-2 hover:text-kingspan-blue transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                BioAir
              </motion.a>
              <motion.a 
                href="/#biotec" 
                onClick={() => setMobileMenuOpen(false)} 
                className="py-2 hover:text-kingspan-blue transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                BioTec Flo
              </motion.a>
              <motion.a 
                href="/#rainstore" 
                onClick={() => setMobileMenuOpen(false)} 
                className="py-2 hover:text-kingspan-blue transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                RainStore
              </motion.a>
              <motion.a 
                href="/#psd1" 
                onClick={() => setMobileMenuOpen(false)} 
                className="py-2 hover:text-kingspan-blue transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                PSD1
              </motion.a>
              <motion.a 
                href="/#downloads" 
                onClick={() => setMobileMenuOpen(false)} 
                className="py-2 hover:text-kingspan-blue transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {t('navigation.downloads')}
              </motion.a>
              <motion.a 
                href="/#contact" 
                onClick={() => setMobileMenuOpen(false)} 
                className="py-2 hover:text-kingspan-blue transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                {t('navigation.contact')}
              </motion.a>
              <motion.a 
                href="/calculator" 
                onClick={() => setMobileMenuOpen(false)} 
                className="py-2 px-3 rounded-xl border border-kingspan-cloud hover:bg-kingspan-cloud text-xs uppercase tracking-wide inline-block"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {t('navigation.calculator')}
              </motion.a>
              <motion.a 
                href="/about" 
                onClick={() => setMobileMenuOpen(false)} 
                className="py-2 px-3 rounded-xl border border-kingspan-cloud hover:bg-kingspan-cloud text-xs uppercase tracking-wide inline-block"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.55 }}
              >
                {t('navigation.about')}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
