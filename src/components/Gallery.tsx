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
        // Display the first image to fill the entire container
        return (
          <div className="w-full h-full overflow-hidden min-h-[200px] sm:min-h-[300px] md:min-h-[400px]">
            <img 
              src={`/images/${folder}/${images[0]}`} 
              alt={folder} 
              className="w-full h-full object-contain rounded-xl border bg-white/70" 
              style={{ transform: 'translateY(-20px)' }}
            />
          </div>
        )
      }

  return (
    <div className="relative">
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((src) => (
          <img key={src} src={`/images/${folder}/${src}`} alt={folder} style={{height}} className="rounded-xl border bg-white/70" />
        ))}
      </div>
    </div>
  )
}