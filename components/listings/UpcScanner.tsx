'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library'
import { Scan, X, Loader2, Camera, AlertCircle } from 'lucide-react'
import { ToolCategory } from '@/lib/types'

export interface UpcScanResult {
  title: string
  brand: string
  model: string
  description: string
  category: ToolCategory | ''
  images: string[]
  retailPrice: number | null // dollars
}

interface Props {
  onResult: (result: UpcScanResult) => void
  onClose: () => void
}

type ScanState = 'idle' | 'scanning' | 'looking-up' | 'error'

export default function UpcScanner({ onResult, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const readerRef = useRef<BrowserMultiFormatReader | null>(null)
  const [scanState, setScanState] = useState<ScanState>('idle')
  const [error, setError] = useState('')
  const [manualUpc, setManualUpc] = useState('')

  const startScanning = useCallback(async () => {
    setScanState('scanning')
    setError('')
    try {
      const reader = new BrowserMultiFormatReader()
      readerRef.current = reader
      const devices = await BrowserMultiFormatReader.listVideoInputDevices()
      // Prefer back camera on mobile
      const device = devices.find(d => /back|rear|environment/i.test(d.label)) ?? devices[0]
      if (!device) throw new Error('No camera found')

      await reader.decodeFromVideoDevice(device.deviceId, videoRef.current!, async (result, err) => {
        if (result) {
          reader.reset()
          await lookupUpc(result.getText())
        } else if (err && !(err instanceof NotFoundException)) {
          console.warn('Scan error:', err)
        }
      })
    } catch (e) {
      setScanState('error')
      setError(e instanceof Error ? e.message : 'Camera unavailable')
    }
  }, [])

  useEffect(() => {
    startScanning()
    return () => { readerRef.current?.reset() }
  }, [startScanning])

  async function lookupUpc(upc: string) {
    readerRef.current?.reset()
    setScanState('looking-up')
    setError('')
    try {
      const res = await fetch(`/api/upc-lookup?upc=${upc}`)
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? 'Product not found')
      }
      const data: UpcScanResult & { upc: string } = await res.json()
      onResult(data)
    } catch (e) {
      setScanState('error')
      setError(e instanceof Error ? e.message : 'Lookup failed')
    }
  }

  async function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (manualUpc.trim()) await lookupUpc(manualUpc.trim())
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-sm shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Scan size={18} className="text-brand-500" />
            <span className="font-semibold text-gray-900 text-sm">Scan Barcode</span>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Camera viewfinder */}
        <div className="relative bg-black aspect-video">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />
          {/* Targeting overlay */}
          {scanState === 'scanning' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-56 h-24 border-2 border-white/70 rounded-lg relative">
                <span className="absolute -top-0.5 -left-0.5 w-5 h-5 border-t-2 border-l-2 border-brand-400 rounded-tl-md" />
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 border-t-2 border-r-2 border-brand-400 rounded-tr-md" />
                <span className="absolute -bottom-0.5 -left-0.5 w-5 h-5 border-b-2 border-l-2 border-brand-400 rounded-bl-md" />
                <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 border-b-2 border-r-2 border-brand-400 rounded-br-md" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-px bg-brand-400/60 animate-pulse" />
                </div>
              </div>
              <p className="absolute bottom-3 text-white/80 text-xs">Point at barcode</p>
            </div>
          )}
          {/* Looking up state */}
          {scanState === 'looking-up' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
              <Loader2 size={32} className="text-white animate-spin mb-2" />
              <p className="text-white text-sm font-medium">Looking up product…</p>
            </div>
          )}
          {/* Error state */}
          {scanState === 'error' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 px-6 text-center">
              <AlertCircle size={28} className="text-red-400 mb-2" />
              <p className="text-white text-sm mb-3">{error}</p>
              <button
                onClick={startScanning}
                className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <Camera size={14} />Try again
              </button>
            </div>
          )}
        </div>

        {/* Manual entry fallback */}
        <div className="p-4">
          <p className="text-xs text-gray-400 text-center mb-3">Can&apos;t scan? Enter the barcode manually.</p>
          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <input
              type="text"
              inputMode="numeric"
              value={manualUpc}
              onChange={e => setManualUpc(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter UPC / EAN number"
              className="flex-1 input-base text-sm"
              maxLength={14}
            />
            <button
              type="submit"
              disabled={!manualUpc.trim() || scanState === 'looking-up'}
              className="px-3 py-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              {scanState === 'looking-up' ? <Loader2 size={14} className="animate-spin" /> : 'Go'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
