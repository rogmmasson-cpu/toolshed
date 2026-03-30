'use client'

import { useEffect, useRef } from 'react'

// Tell TypeScript about the adsbygoogle global
declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[]
  }
}

export type AdFormat =
  | 'auto'           // Google picks the best size
  | 'fluid'          // Native / in-feed style
  | 'rectangle'      // 300×250 medium rectangle
  | 'leaderboard'    // 728×90 horizontal banner
  | 'horizontal'     // Responsive horizontal

interface AdUnitProps {
  /** Ad slot ID from your AdSense account (e.g. "1234567890") */
  slot: string
  format?: AdFormat
  className?: string
  /** Label shown above the ad — defaults to "Advertisement" */
  label?: string | false
}

const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID

export default function AdUnit({
  slot,
  format = 'auto',
  className = '',
  label = 'Advertisement',
}: AdUnitProps) {
  const pushed = useRef(false)

  useEffect(() => {
    if (!PUBLISHER_ID || pushed.current) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      pushed.current = true
    } catch {
      // AdSense not loaded yet — auto-ads script will retry
    }
  }, [])

  // Don't render anything if publisher ID isn't configured
  if (!PUBLISHER_ID) return null

  return (
    <div className={`text-center ${className}`}>
      {label && (
        <p className="text-[10px] text-gray-300 uppercase tracking-widest mb-1">{label}</p>
      )}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
