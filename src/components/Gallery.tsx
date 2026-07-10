import { useEffect, useState } from 'react'

type GalleryProps = {
  folder: string  // relative to /public/images, e.g. 'biodisc'
  height?: number
  fullWidth?: boolean
}

export default function Gallery({ folder, height = 220, fullWidth = false }: GalleryProps) {
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    // Expect a manifest per folder under /public/images/{folder}/manifest.json
    fetch(`/images/${folder}/manifest.json`).then(r => r.ok ? r.json() : []).then((list) => {
      setImages(Array.isArray(list) ? list : [])
    }).catch(() => setImages([]))
  }, [folder])

  if (!images.length) {
    return <div className="w-full text-sm text-gray-500">Add images to <code>/public/images/{folder}/</code> and a <code>manifest.json</code> file.</div>
  }

  if (fullWidth) {
    // Prefer the generated `.opt.webp` (native-resolution, ~85-95% smaller —
    // see scripts/optimize-images.mjs) over the full-resolution .png/.jpg,
    // and prefer both of those over the pre-existing .webp thumbnails that
    // ship alongside them — those are ~800px derivatives and blur badly
    // when stretched full-card-width. Skip standalone logo/watermark assets.
    const isOptimized = (f: string) => /\.opt\.webp$/i.test(f)
    const isRaster = (f: string) => /\.(png|jpe?g)$/i.test(f)
    const isLogo = (f: string) => /logo/i.test(f)
    const hero =
      images.find((f) => isOptimized(f) && !isLogo(f)) ??
      images.find((f) => isRaster(f) && !isLogo(f)) ??
      images.find((f) => isRaster(f)) ??
      images[0]
    const heroSrc = `/images/${folder}/${hero}`
    return (
      <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-[var(--bg-raised)]">
        {/* Blurred fill so the frame never looks empty around a contained image */}
        <img
          src={heroSrc}
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-40"
        />
        {/* object-contain: the whole product photo stays visible, never cropped */}
        <img
          src={heroSrc}
          alt={folder}
          loading="lazy"
          decoding="async"
          className="relative block w-full h-full object-contain"
        />
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((src) => (
          <img key={src} src={`/images/${folder}/${src}`} alt={folder} style={{ height }} className="rounded-2xl border bg-white/70" loading="lazy" />
        ))}
      </div>
    </div>
  )
}
