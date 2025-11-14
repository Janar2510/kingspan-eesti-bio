import { useTranslation } from 'react-i18next'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="text-kingspan-navy">
      <Header />
      
      {/* Hero Section with Mountains */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/About section/About page 2.jpg" 
            alt="Mountains" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
              {t('about.hero.title')}
            </h1>
            <p className="text-2xl md:text-3xl font-semibold drop-shadow-md">
              {t('about.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Opening Text */}
        <section className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-kingspan-blue">
            {t('about.section1.title')}
          </h2>
          <p className="text-lg md:text-xl text-kingspan-slate leading-relaxed">
            {t('about.section1.content')}
          </p>
        </section>

        {/* Images Section */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <img 
              src="/About section/About page3 .png" 
              alt="About" 
              className="w-full rounded-2xl shadow-card object-cover"
            />
          </div>
          <div className="space-y-4 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-kingspan-blue">
              {t('about.section2.title')}
            </h3>
            <p className="text-lg text-kingspan-slate leading-relaxed">
              {t('about.section2.content')}
            </p>
          </div>
        </section>

        {/* Additional Image */}
        <section className="w-full">
          <img 
            src="/About section/About page4.png" 
            alt="About" 
            className="w-full rounded-2xl shadow-card object-cover max-h-[600px]"
          />
        </section>
      </main>

      <Footer />
    </div>
  )
}

