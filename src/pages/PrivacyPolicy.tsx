import { useTranslation } from 'react-i18next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEOHead from '../components/SEOHead'

const sections = ['overview', 'collection', 'usage', 'sharing', 'rights', 'contact'] as const

export default function PrivacyPolicy() {
  const { t } = useTranslation()

  return (
    <div className="surface-base min-h-screen">
      <SEOHead />
      <Header />

      <main className="max-w-4xl mx-auto px-4 md:px-6 pt-28 pb-16 md:pt-32 md:pb-20 space-y-8 md:space-y-10">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#EAF1F8]">
            {t('privacy.title')}
          </h1>
          <p className="mt-3 md:mt-4 text-[#9FB4CC] text-xs sm:text-sm uppercase tracking-wide">
            {t('privacy.updated')}
          </p>
          <p className="mt-4 md:mt-6 text-base sm:text-lg text-[#9FB4CC] leading-relaxed">
            {t('privacy.intro')}
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {sections.map((key) => (
            <section key={key} className="glass-dark rounded-2xl p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#EAF1F8] mb-3">
                {t(`privacy.sections.${key}.title`)}
              </h2>
              <p className="text-sm sm:text-base text-[#9FB4CC] leading-relaxed">
                {t(`privacy.sections.${key}.body`)}
              </p>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
