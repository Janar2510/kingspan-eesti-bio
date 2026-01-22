import { useEffect, useRef, useState } from 'react'

export default function InfiniteScrollGallery() {
  const ref = useRef<HTMLDivElement>(null)
  const [images, setImages] = useState<string[]>([])

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

  useEffect(() => {
    // Load images from manifest.json in the infinite scroll animation folder
    fetch('/images/infinite scroll animation/manifest.json')
      .then(r => r.ok ? r.json() : [])
      .then((list) => {
        const imageList = Array.isArray(list) ? list : []
        // Convert filenames to full paths
        const imagePaths = imageList.map((filename: string) => {
          const trimmedFilename = filename.trim() // Remove any leading/trailing spaces
          return `/images/infinite scroll animation/${trimmedFilename}`
        })
        setImages(imagePaths)
      })
      .catch((err) => {
        console.error('Error loading infinite scroll images:', err)
        setImages([])
      })
  }, [])

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images]

  if (images.length === 0) {
    return (
      <div ref={ref} className="card-spotlight card-border p-4 sm:p-6 md:p-8 bg-white/70 shadow-card rounded-2xl w-full h-full flex flex-col overflow-hidden">
        <div className="w-full text-sm text-gray-500 text-center py-8">
          Add images to <code>/public/images/infinite scroll animation/</code> and run <code>npm run gen:images</code>
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className="card-spotlight card-border p-4 sm:p-6 md:p-8 bg-white/70 shadow-card rounded-2xl w-full h-full flex flex-col overflow-hidden">
      {/* Scrolling images container */}
      <div className="relative w-full flex items-center justify-center py-4 md:py-6">
        <div className="scroll-container w-full">
          <div className="infinite-scroll flex gap-4 md:gap-6 w-max">
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="image-item flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-xl overflow-hidden border border-kingspan-cloud shadow-card"
              >
                <img
                  src={image}
                  alt={`Gallery image ${(index % images.length) + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    console.error('Failed to load image:', image)
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
