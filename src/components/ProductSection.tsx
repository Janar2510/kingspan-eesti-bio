import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Gallery from './Gallery'

type Props = {
  id: string
  titleKey: string
  descKey: string
  pills?: string[]
}

export default function ProductSection({ id, titleKey, descKey, pills = [] }: Props) {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      el.style.setProperty('--pointer-x', x + 'px')
      el.style.setProperty('--pointer-y', y + 'px')
    }
    el.addEventListener('mousemove', onMouseMove)
    return () => el.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <section id={id} className="h-screen flex items-center mb-5">
      <div className="px-6 w-full h-full">
        <div ref={ref} className="card-spotlight card-border p-8 bg-white/70 shadow-card rounded-2xl h-full flex flex-col">
          <div className="flex flex-col h-full gap-4">
            <div className="flex-shrink-0">
              <h2 className="text-4xl md:text-5xl font-bold">{t(titleKey)}</h2>
              <p className="mt-1 text-kingspan-slate">{t(descKey)}</p>
              {pills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {pills.map(p => (
                    <span key={p} className="px-3 py-1 rounded-full bg-kingspan-cloud text-xs">{p}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 min-h-0 w-full overflow-visible">
              <Gallery folder={id} fullWidth={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}