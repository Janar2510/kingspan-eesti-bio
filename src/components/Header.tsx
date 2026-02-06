import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Languages, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const { i18n, t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)

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
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none">
        <div className="h-full w-full bg-gradient-to-b from-white/40 via-transparent to-transparent" />
      </div>
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-20 md:h-28 flex items-center justify-between">
        <a href="/" className="flex items-center h-full gap-2 sm:gap-3 mr-3 sm:mr-4 md:mr-6 flex-shrink-0 ml-0 md:ml-[-20px] lg:ml-[-60px]">
          <img 
            src="/Kingspan%20Logo.jpeg" 
            alt="Kingspan Biopuhastid" 
            className="h-12 sm:h-14 md:h-16 w-auto object-contain block"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <img 
            src="/images/rainstore/Logo.png" 
            alt="Kingspan Biopuhastid logo" 
            className="h-10 sm:h-12 md:h-14 w-auto object-contain block"
          />
        </a>
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm">
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <motion.button
              className="inline-flex items-center gap-2 hover:text-kingspan-blue transition-colors nav-link"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
            >
              Tooted
              <motion.span
                animate={{ rotate: productsOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▾
              </motion.span>
            </motion.button>
            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute left-0 top-full mt-3 w-56 rounded-2xl border border-white/40 bg-white/70 shadow-lg backdrop-blur-xl"
                >
                  <div className="flex flex-col p-2 text-sm">
                    <a href="/#biodisc" className="rounded-xl px-3 py-2 hover:bg-white/70 nav-link">BioDisc</a>
                    <a href="/#bioficient" className="rounded-xl px-3 py-2 hover:bg-white/70 nav-link">BioFicient</a>
                    <a href="/#bioair" className="rounded-xl px-3 py-2 hover:bg-white/70 nav-link">BioAir</a>
                    <a href="/#biotec" className="rounded-xl px-3 py-2 hover:bg-white/70 nav-link">BioTec Flo</a>
                    <a href="/#rainstore" className="rounded-xl px-3 py-2 hover:bg-white/70 nav-link">RainStore</a>
                    <a href="/#psd1" className="rounded-xl px-3 py-2 hover:bg-white/70 nav-link">PSD1</a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.a 
            href="/#downloads" 
            className="hover:text-kingspan-blue transition-colors nav-link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('navigation.downloads')}
          </motion.a>
          <motion.a 
            href="/#contact" 
            className="hover:text-kingspan-blue transition-colors nav-link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('navigation.contact')}
          </motion.a>
          <motion.a 
            href="/calculator" 
            className="btn-ghost text-xs uppercase tracking-wide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('navigation.calculator')}
          </motion.a>
          <motion.a 
            href="/about" 
            className="btn-ghost text-xs uppercase tracking-wide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('navigation.about')}
          </motion.a>
          <motion.button 
            onClick={toggle} 
            className="btn-ghost inline-flex items-center gap-2"
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
            className="btn-ghost inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Languages className="w-4 h-4" />
            <span className="text-xs">{i18n.language === 'ee' ? 'EN' : 'EE'}</span>
          </motion.button>
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-ghost p-2"
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
              <div className="text-xs uppercase tracking-wide text-kingspan-slate/70">Tooted</div>
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
                className="btn-ghost py-2 px-3 text-xs uppercase tracking-wide inline-block"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {t('navigation.calculator')}
              </motion.a>
              <motion.a 
                href="/about" 
                onClick={() => setMobileMenuOpen(false)} 
                className="btn-ghost py-2 px-3 text-xs uppercase tracking-wide inline-block"
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
