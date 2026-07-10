import { useRef, type ReactNode } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'

/**
 * ScrubText — words fade from faint to full opacity, driven by scroll
 * position (not time). The paragraph is fully readable without JS or with
 * reduced motion: the effect only dims words before they scrub in.
 */
export function ScrubText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.4'],
  })
  const words = text.split(' ')

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    )
  }

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        >
          {word}
        </Word>
      ))}
    </p>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: ReactNode
  progress: ReturnType<typeof useMotionValue<number>>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <span className="inline-block" aria-hidden="true">
      <motion.span style={{ opacity }} className="inline-block">
        {children}
      </motion.span>
      {' '}
    </span>
  )
}

/**
 * Magnetic — child follows the pointer within a small radius, springs back
 * on leave. No-op for reduced motion and coarse (touch) pointers.
 */
export function Magnetic({
  children,
  strength = 0.25,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.6 })

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }
  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
