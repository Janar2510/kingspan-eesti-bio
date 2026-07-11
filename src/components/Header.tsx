import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Languages, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const { i18n, t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const productsMenuId = 'products-submenu'

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ee' ? 'en' : 'ee')
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed-header fixed top-0 left-0 right-0 z-header px-4 md:px-12 lg:px-16 pt-4 md:pt-6 text-white"
    >
      <div className="liquid-glass overflow-visible rounded-xl px-4 py-2 md:py-3 flex items-center justify-between max-w-6xl mx-auto">
        <a href="/" className="flex items-center h-full gap-2 sm:gap-3 mr-3 sm:mr-4 md:mr-6 flex-shrink-0">
          <img
            src="/Kingspan%20Logo.jpeg"
            alt="Kingspan Biopuhastid"
            className="h-9 sm:h-10 md:h-12 w-auto object-contain block"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <img
            src="/images/rainstore/Logo.png"
            alt="Kingspan Biopuhastid logo"
            className="h-8 sm:h-9 md:h-10 w-auto object-contain block"
          />
        </a>
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm">
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <motion.button
              className="inline-flex items-center gap-2 hover:text-aqua-300 transition-colors nav-link"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              aria-haspopup="true"
              aria-expanded={productsOpen}
              aria-controls={productsMenuId}
              onClick={() => setProductsOpen((v) => !v)}
              onFocus={() => setProductsOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setProductsOpen(false)
              }}
            >
              {t('navigation.products')}
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
                  id={productsMenuId}
                  role="menu"
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  onFocus={() => setProductsOpen(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setProductsOpen(false)
                  }}
                  className="liquid-glass absolute left-0 top-full mt-3 w-56 rounded-2xl border border-white/20 shadow-lg"
                >
                  <div className="flex flex-col p-2 text-sm">
                    <a href="/#biodisc" role="menuitem" className="rounded-xl px-3 py-2 hover:bg-white/10 nav-link">BioDisc</a>
                    <a href="/#bioficient" role="menuitem" className="rounded-xl px-3 py-2 hover:bg-white/10 nav-link">BioFicient</a>
                    <a href="/#bioair" role="menuitem" className="rounded-xl px-3 py-2 hover:bg-white/10 nav-link">BioAir</a>
                    <a href="/#biotec" role="menuitem" className="rounded-xl px-3 py-2 hover:bg-white/10 nav-link">BioTec Flo</a>
                    <a href="/#rainstore" role="menuitem" className="rounded-xl px-3 py-2 hover:bg-white/10 nav-link">RainStore</a>
                    <a href="/#psd1" role="menuitem" className="rounded-xl px-3 py-2 hover:bg-white/10 nav-link">PSD1</a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.a
            href="/#downloads"
            className="hover:text-aqua-300 transition-colors nav-link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('navigation.downloads')}
          </motion.a>
          <motion.a
            href="/hajaasustuse-programm"
            className="transition-colors nav-link font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hajaasustus 2026
          </motion.a>
          <motion.a
            href="/blog"
            className="hover:text-aqua-300 transition-colors nav-link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Blogi
          </motion.a>
          <motion.a
            href="/#contact"
            className="hover:text-aqua-300 transition-colors nav-link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('navigation.contact')}
          </motion.a>
          <motion.a
            href="/calculator"
            className="nav-pill"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('navigation.calculator')}
          </motion.a>
          <motion.a
            href="/about"
            className="nav-pill"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('navigation.about')}
          </motion.a>
          <motion.button
            onClick={toggle}
            className="nav-pill inline-flex items-center gap-2"
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
            className="nav-pill inline-flex items-center gap-2 min-h-[44px] min-w-[44px] justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Languages className="w-4 h-4" />
            <span className="text-xs">{i18n.language === 'ee' ? 'EN' : 'EE'}</span>
          </motion.button>
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="nav-pill p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
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
            className="liquid-glass lg:hidden mx-4 mt-3 rounded-xl overflow-hidden text-white"
          >
            <nav className="px-4 py-4 flex flex-col gap-3">
              <div className="text-xs uppercase tracking-wide text-white/50">{t('navigation.products')}</div>
              <motion.a
                href="/#biodisc"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-aqua-300 transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                BioDisc
              </motion.a>
              <motion.a
                href="/#bioficient"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-aqua-300 transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                BioFicient
              </motion.a>
              <motion.a
                href="/#bioair"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-aqua-300 transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                BioAir
              </motion.a>
              <motion.a
                href="/#biotec"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-aqua-300 transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                BioTec Flo
              </motion.a>
              <motion.a
                href="/#rainstore"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-aqua-300 transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                RainStore
              </motion.a>
              <motion.a
                href="/#psd1"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-aqua-300 transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                PSD1
              </motion.a>
              <motion.a
                href="/#downloads"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-aqua-300 transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {t('navigation.downloads')}
              </motion.a>
              <motion.a
                href="/hajaasustuse-programm"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-aqua-300 transition-colors text-gold-400 font-medium"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.42 }}
              >
                Hajaasustus 2026
              </motion.a>
              <motion.a
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-aqua-300 transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.44 }}
              >
                Blogi
              </motion.a>
              <motion.a
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-aqua-300 transition-colors"
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
