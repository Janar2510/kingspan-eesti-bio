import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEOHead from '../components/SEOHead'
import { blogPosts, formatDate } from '../data/blog'

export default function Blog() {
  const { i18n } = useTranslation()
  const lang = i18n.language

  return (
    <div className="surface-base min-h-screen">
      <SEOHead />
      <Header />

      {/* Hero */}
      <section className="surface-deep pt-32 pb-16 md:pt-40 md:pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-aqua-300 mb-4 block">
              {lang === 'ee' ? 'Blogi' : 'Blog'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#EAF1F8] mb-4" style={{ letterSpacing: '-0.03em' }}>
              {lang === 'ee'
                ? 'Reoveepuhastus ja biopuhastid Eestis'
                : 'Wastewater treatment in Estonia'}
            </h1>
            <p className="text-lg md:text-xl text-[#9FB4CC] max-w-2xl">
              {lang === 'ee'
                ? 'Praktilised artiklid biopuhastite valiku, paigalduse ja riikliku toetuse kohta.'
                : 'Practical articles on choosing, installing, and funding a biological treatment system.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Post grid */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post, i) => {
            const title = lang === 'ee' ? post.titleEE : post.titleEN
            const excerpt = lang === 'ee' ? post.excerptEE : post.excerptEN
            return (
              <motion.a
                key={post.slug}
                href={`/blog/${post.slug}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-dark rounded-2xl overflow-hidden group flex flex-col hover:border-white/25 transition-all"
              >
                {/* Card colour bar */}
                <div className={`h-2 w-full bg-gradient-to-r ${post.accentColor} opacity-80`} />

                <div className="p-6 md:p-7 flex flex-col flex-1 gap-4">
                  <div className="flex items-center gap-3 text-xs text-[#9FB4CC]/70">
                    <span>{formatDate(post.date, lang)}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readingTime} min
                    </span>
                  </div>

                  <h2 className="text-lg md:text-xl font-bold text-[#EAF1F8] leading-snug group-hover:text-aqua-300 transition-colors">
                    {title}
                  </h2>

                  <p className="text-sm text-[#9FB4CC] leading-relaxed flex-1">
                    {excerpt}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-aqua-300 group-hover:gap-3 transition-all">
                    {lang === 'ee' ? 'Loe edasi' : 'Read more'}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.a>
            )
          })}
        </div>
      </main>

      <Footer />
    </div>
  )
}
