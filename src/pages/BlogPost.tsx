import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEOHead from '../components/SEOHead'
import { getPostBySlug, formatDate, type BlogSection } from '../data/blog'

const slug = window.location.pathname.split('/').filter(Boolean)[1] ?? ''

function renderSection(s: BlogSection, i: number) {
  if (s.type === 'h2') {
    return (
      <h2 key={i} className="text-2xl md:text-3xl font-bold text-[#EAF1F8] mt-10 mb-4" style={{ letterSpacing: '-0.02em' }}>
        {s.content as string}
      </h2>
    )
  }
  if (s.type === 'p') {
    return (
      <p key={i} className="text-base md:text-lg text-[#9FB4CC] leading-relaxed mb-4">
        {s.content as string}
      </p>
    )
  }
  if (s.type === 'ul') {
    const items = Array.isArray(s.content) ? s.content : [s.content]
    return (
      <ul key={i} className="mb-4 space-y-2">
        {items.map((item, j) => (
          <li key={j} className="flex gap-3 text-[#9FB4CC] text-base md:text-lg leading-relaxed">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-aqua-300 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    )
  }
  if (s.type === 'cta') {
    return (
      <div key={i} className="mt-10 p-6 md:p-8 glass-dark rounded-2xl border border-aqua-300/20 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-[#EAF1F8] font-semibold text-lg">
          {s.content as string}
        </p>
        <a href="/#contact" className="btn-gold whitespace-nowrap shrink-0">
          Kingspan Eesti
        </a>
      </div>
    )
  }
  return null
}

export default function BlogPost() {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="surface-base min-h-screen">
        <Header />
        <main className="max-w-3xl mx-auto px-4 pt-40 pb-20 text-center">
          <h1 className="text-3xl font-bold text-[#EAF1F8] mb-4">404</h1>
          <p className="text-[#9FB4CC] mb-8">Artiklit ei leitud.</p>
          <a href="/blog" className="btn-gold">Tagasi blogi</a>
        </main>
        <Footer />
      </div>
    )
  }

  const title = lang === 'ee' ? post.titleEE : post.titleEN
  const sections = lang === 'ee' ? post.sections : post.sectionsEN

  return (
    <div className="surface-base min-h-screen">
      <SEOHead />
      <Header />

      {/* Hero */}
      <section className={`surface-deep bg-gradient-to-b ${post.accentColor} pt-32 pb-12 md:pt-40 md:pb-16 px-4 md:px-6`}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#9FB4CC] hover:text-aqua-300 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {lang === 'ee' ? 'Tagasi blogi' : 'Back to blog'}
            </a>

            <div className="flex items-center gap-3 text-xs text-[#9FB4CC]/70 mb-5">
              <span>{formatDate(post.date, lang)}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime} min
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#EAF1F8] leading-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              {title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <main className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {sections.map((s, i) => renderSection(s, i))}
        </motion.article>

        {/* Related posts */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <h3 className="text-sm uppercase tracking-widest text-[#9FB4CC]/60 mb-6">
            {lang === 'ee' ? 'Seotud artiklid' : 'Related articles'}
          </h3>
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-aqua-300 font-semibold hover:text-aqua-200 transition-colors"
          >
            {lang === 'ee' ? 'Vaata kõiki artikleid' : 'See all articles'}
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
