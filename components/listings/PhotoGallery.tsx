'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, X, Grid3X3 } from 'lucide-react'

interface PhotoGalleryProps {
  photos: string[]
  title: string
}

export default function PhotoGallery({ photos, title }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)

  const prev = () => setActiveIdx((i) => (i === 0 ? photos.length - 1 : i - 1))
  const next = () => setActiveIdx((i) => (i === photos.length - 1 ? 0 : i + 1))

  return (
    <>
      {/* Gallery grid */}
      <div className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden h-72 sm:h-96">
        {/* Main photo */}
        <div
          className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden bg-gray-100"
          onClick={() => { setActiveIdx(0); setLightboxOpen(true) }}
        >
          <img src={photos[0]} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>
        {/* Secondary photos */}
        {photos.slice(1, 4).map((photo, i) => (
          <div
            key={i}
            className="relative cursor-pointer overflow-hidden bg-gray-100"
            onClick={() => { setActiveIdx(i + 1); setLightboxOpen(true) }}
          >
            <img src={photo} alt={`${title} ${i + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            {i === 2 && photos.length > 4 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="flex items-center gap-1 text-white font-semibold text-sm">
                  <Grid3X3 size={16} />+{photos.length - 4} more
                </span>
              </div>
            )}
          </div>
        ))}
        {/* Pad empty slots */}
        {Array.from({ length: Math.max(0, 3 - (photos.length - 1)) }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-gray-100" />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}>
          <button
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-xl"
            onClick={() => setLightboxOpen(false)}
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/20 rounded-xl"
            onClick={(e) => { e.stopPropagation(); prev() }}
          >
            <ChevronLeft size={32} />
          </button>

          <img
            src={photos[activeIdx]}
            alt={title}
            className="max-h-full max-w-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/20 rounded-xl"
            onClick={(e) => { e.stopPropagation(); next() }}
          >
            <ChevronRight size={32} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setActiveIdx(i) }}
                className={`w-2 h-2 rounded-full transition-colors ${i === activeIdx ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
