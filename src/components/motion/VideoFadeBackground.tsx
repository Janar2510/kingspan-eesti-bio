import { useEffect, useRef, useState } from 'react'

type VideoFadeBackgroundProps = {
  src: string
  className?: string
}

const FADE_DURATION = 250 // ms
const CROSSFADE_LEAD = 0.55 // seconds before the active clip ends to start crossfading

/**
 * Looping background video with a custom rAF-driven crossfade (no CSS
 * transitions). Two stacked <video> elements share one source: while one
 * plays, the other is paused and primed at frame 0. Shortly before the
 * active clip ends, the standby clip starts playing and both opacities
 * animate in lockstep — one clip is always fully visible, so the loop
 * never drops to black the way a single fade-out/seek/fade-in would.
 *
 * Sized via a wrapper div, not the <video>'s own width/height: percentage
 * sizing on a replaced element (<video>/<img>) doesn't resolve the same
 * way as on a normal block box, so `w-[115%]` on the <video> itself silently
 * computes as 100% — putting it on the wrapper and the video at `w-full
 * h-full` inside avoids that.
 */
export default function VideoFadeBackground({ src, className = '' }: VideoFadeBackgroundProps) {
  const videoARef = useRef<HTMLVideoElement | null>(null)
  const videoBRef = useRef<HTMLVideoElement | null>(null)
  const activeRef = useRef<'a' | 'b'>('a')
  const rafRef = useRef<number | null>(null)
  const crossfadingRef = useRef(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const a = videoARef.current
    const b = videoBRef.current
    if (!a || !b || failed) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const cancelFade = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }

    const crossfade = (outEl: HTMLVideoElement, inEl: HTMLVideoElement, duration: number) => {
      cancelFade()
      const outFrom = parseFloat(outEl.style.opacity || '1')
      const inFrom = parseFloat(inEl.style.opacity || '0')
      const start = performance.now()
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        outEl.style.opacity = String(outFrom + (0 - outFrom) * progress)
        inEl.style.opacity = String(inFrom + (1 - inFrom) * progress)
        rafRef.current = progress < 1 ? requestAnimationFrame(step) : null
      }
      rafRef.current = requestAnimationFrame(step)
    }

    a.muted = true
    b.muted = true

    if (reduceMotion) {
      a.style.opacity = '1'
      b.style.opacity = '0'
      a.play().catch(() => {})
      return
    }

    // Idempotent on every (re)run, including a StrictMode double-invoke —
    // doesn't wait on an event that might not refire on an already-playing
    // element, it just asserts the correct state directly.
    a.style.opacity = '1'
    b.style.opacity = '0'
    a.play().catch(() => {})

    const onTimeUpdate = () => {
      if (crossfadingRef.current) return
      const active = activeRef.current === 'a' ? a : b
      const standby = activeRef.current === 'a' ? b : a
      if (active.duration && active.duration - active.currentTime <= CROSSFADE_LEAD) {
        crossfadingRef.current = true
        standby.currentTime = 0
        standby.play().catch(() => {})
        crossfade(active, standby, FADE_DURATION)
        activeRef.current = activeRef.current === 'a' ? 'b' : 'a'
        window.setTimeout(() => {
          crossfadingRef.current = false
        }, FADE_DURATION)
      }
    }

    a.addEventListener('timeupdate', onTimeUpdate)
    b.addEventListener('timeupdate', onTimeUpdate)

    return () => {
      cancelFade()
      a.removeEventListener('timeupdate', onTimeUpdate)
      b.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [failed])

  if (failed) {
    return <div className={`absolute inset-0 water-field surface-deep ${className}`} />
  }

  const videoClass = 'absolute inset-0 w-full h-full object-cover object-center'

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video ref={videoARef} autoPlay muted playsInline aria-hidden="true" onError={() => setFailed(true)} className={videoClass}>
        <source src={src} type="video/mp4" />
      </video>
      <video ref={videoBRef} muted playsInline aria-hidden="true" className={videoClass}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}
