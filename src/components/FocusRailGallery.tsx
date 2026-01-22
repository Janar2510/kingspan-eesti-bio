import { useEffect, useState } from 'react'
import { FocusRail, FocusRailItem } from './FocusRail'

export default function FocusRailGallery() {
  const [items, setItems] = useState<FocusRailItem[]>([])

  useEffect(() => {
    // Load images from manifest.json in the infinite scroll animation folder
    fetch('/images/infinite scroll animation/manifest.json')
      .then(r => r.ok ? r.json() : [])
      .then((list) => {
        const imageList = Array.isArray(list) ? list : []
        // Convert filenames to FocusRailItem objects
        const railItems: FocusRailItem[] = imageList.map((filename: string, index: number) => {
          const trimmedFilename = filename.trim()
          const imagePath = `/images/infinite scroll animation/${trimmedFilename}`
          // Extract a title from filename (remove extension, capitalize)
          const title = trimmedFilename
            .replace(/\.[^/.]+$/, '') // Remove extension
            .replace(/[-_]/g, ' ') // Replace dashes/underscores with spaces
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
          
          return {
            id: index,
            title: title || `Image ${index + 1}`,
            imageSrc: imagePath,
          }
        })
        setItems(railItems)
      })
      .catch((err) => {
        console.error('Error loading focus rail images:', err)
        setItems([])
      })
  }, [])

  if (items.length === 0) {
    return (
      <div className="card-spotlight card-border p-4 sm:p-6 md:p-8 bg-white/70 shadow-card rounded-2xl w-full h-full flex flex-col items-center justify-center text-sm text-gray-500">
        Add images to <code>/public/images/infinite scroll animation/</code> and run <code>npm run gen:images</code>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded-2xl">
      <FocusRail
        items={items}
        autoPlay={true}
        interval={4000}
        loop={true}
        className="w-full rounded-2xl"
      />
    </div>
  )
}
