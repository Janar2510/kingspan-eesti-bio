import { AnimatePresence, motion, Variants } from 'framer-motion'

interface GradualSpacingProps {
  text: string
  duration?: number
  delayMultiple?: number
  framerProps?: Variants
  className?: string
  containerClassName?: string
}

export default function GradualSpacing({
  text,
  duration = 0.5,
  delayMultiple = 0.04,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  },
  className,
  containerClassName
}: GradualSpacingProps) {
  const words = text.split(' ')

  return (
    <div className={`flex flex-wrap gap-x-2 ${containerClassName || 'justify-start'}`}>
      <AnimatePresence>
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={framerProps}
            transition={{ duration, delay: i * delayMultiple }}
            className={className ? `drop-shadow-sm ${className}` : 'drop-shadow-sm'}
          >
            {word}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
