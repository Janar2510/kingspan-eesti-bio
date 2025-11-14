import { useTranslation } from 'react-i18next'

const sections = ['overview', 'collection', 'usage', 'sharing', 'rights', 'contact'] as const

export default function PrivacyPolicy() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-white text-kingspan-navy">
      <header className="bg-white/80 border-b sticky top-0 z-40 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <a href="/" className="font-semibold text-kingspan-blue">Kingspan Eesti BIO</a>
          <a
            href="/"
            className="px-4 py-2 rounded-xl border border-kingspan-cloud hover:bg-kingspan-cloud text-sm"
          >
            {t('privacy.back')}
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">{t('privacy.title')}</h1>
          <p className="mt-4 text-kingspan-slate text-sm uppercase tracking-wide">
            {t('privacy.updated')}
          </p>
          <p className="mt-6 text-lg text-kingspan-slate leading-relaxed">
            {t('privacy.intro')}
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((key) => (
            <section key={key}>
              <h2 className="text-2xl font-semibold">{t(`privacy.sections.${key}.title`)}</h2>
              <p className="mt-3 text-kingspan-slate leading-relaxed">
                {t(`privacy.sections.${key}.body`)}
              </p>
            </section>
          ))}
        </div>
      </main>

      <footer className="py-10 bg-white/80 border-t">
        <div className="max-w-4xl mx-auto px-6 text-sm text-kingspan-slate">
          {t('footer.rights')}
        </div>
      </footer>
    </div>
  )
}


