'use client'
import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import ListingFilters from './ListingFilters'
import { cn } from '@/lib/utils/cn'

interface Props {
  activeFiltersCount: number
  hasZip?: boolean
}

export default function MobileFilterDrawer({ activeFiltersCount, hasZip }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Trigger button — only visible on mobile */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden inline-flex items-center gap-2 px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-sm rounded-xl transition-colors relative"
      >
        <SlidersHorizontal size={16} />
        Filters
        {activeFiltersCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 min-w-[1.1rem] bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 w-80 max-w-full bg-white z-50 shadow-xl flex flex-col transition-transform duration-300 lg:hidden',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Filters</h2>
          <button onClick={() => setOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <ListingFilters onApply={() => setOpen(false)} hasZip={hasZip} />
        </div>
        <div className="px-5 py-4 border-t border-gray-100">
          <button
            onClick={() => setOpen(false)}
            className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Show Results
          </button>
        </div>
      </div>
    </>
  )
}
