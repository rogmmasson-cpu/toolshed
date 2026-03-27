'use client'
import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronLeft, ChevronRight, Save, RotateCcw, Info } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isBefore, isToday, parseISO } from 'date-fns'
import { getBlockedDates, setBlockedDates } from '@/lib/utils/local-availability'
import { getListingById } from '@/lib/mock-db/listings'
import { getLocalListingById } from '@/lib/utils/local-listings'
import { cn } from '@/lib/utils/cn'

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface Props { params: Promise<{ id: string }> }

export default function AvailabilityPage({ params }: Props) {
  const { id } = use(params)
  const [title, setTitle] = useState<string>('')
  const [blockedDates, setBlockedDatesState] = useState<Set<string>>(new Set())
  const [viewMonth, setViewMonth] = useState(new Date())
  const [saved, setSaved] = useState(false)
  const [selecting, setSelecting] = useState<string | null>(null)

  // Load listing title + existing blocked dates
  useEffect(() => {
    async function load() {
      let t = 'Tool'
      let defaultBlocked: string[] = []
      const local = getLocalListingById(id)
      if (local) {
        t = local.title
        defaultBlocked = local.availability.blockedDates
      } else {
        const mock = await getListingById(id)
        if (mock) {
          t = mock.title
          defaultBlocked = mock.availability.blockedDates
        }
      }
      setTitle(t)
      const stored = getBlockedDates(id, defaultBlocked)
      setBlockedDatesState(new Set(stored))
    }
    load()
  }, [id])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  function toggleDate(iso: string) {
    const d = parseISO(iso)
    if (isBefore(d, today)) return // can't block past dates
    setBlockedDatesState(prev => {
      const next = new Set(prev)
      if (next.has(iso)) next.delete(iso)
      else next.add(iso)
      return next
    })
    setSaved(false)
  }

  function handleSave() {
    setBlockedDates(id, Array.from(blockedDates).sort())
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handleReset() {
    setBlockedDatesState(new Set())
    setSaved(false)
  }

  // Build calendar grid for current view month
  const monthStart = startOfMonth(viewMonth)
  const monthEnd = endOfMonth(viewMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startOffset = getDay(monthStart) // 0=Sun

  // Count blocked days in view
  const blockedThisMonth = days.filter(d => blockedDates.has(format(d, 'yyyy-MM-dd'))).length

  return (
    <div className="container-app py-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-1">
        <Link href={`/dashboard/listings`} className="p-2 hover:bg-gray-100 rounded-xl text-gray-500">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manage Availability</h1>
          {title && <p className="text-sm text-gray-500">{title}</p>}
        </div>
      </div>

      {/* Info box */}
      <div className="flex items-start gap-2.5 bg-brand-50 border border-brand-100 rounded-xl p-4 mb-6 mt-4 text-sm text-brand-800">
        <Info size={16} className="flex-shrink-0 mt-0.5 text-brand-500" />
        <p>
          Click dates to mark them as <strong>unavailable</strong>. Renters cannot book those days.
          Tap again to re-open a date. Changes take effect immediately after saving.
        </p>
      </div>

      {/* Calendar card */}
      <div className="card p-5">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => setViewMonth(m => subMonths(m, 1))}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <h2 className="text-base font-bold text-gray-900">
            {format(viewMonth, 'MMMM yyyy')}
          </h2>
          <button
            onClick={() => setViewMonth(m => addMonths(m, 1))}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Day of week headers */}
        <div className="grid grid-cols-7 mb-1">
          {DOW.map(d => (
            <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for offset */}
          {Array.from({ length: startOffset }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {days.map(day => {
            const iso = format(day, 'yyyy-MM-dd')
            const isPast = isBefore(day, today)
            const isBlocked = blockedDates.has(iso)
            const isTodayDate = isToday(day)
            const isSat = day.getDay() === 6
            const isSun = day.getDay() === 0

            return (
              <button
                key={iso}
                onClick={() => toggleDate(iso)}
                disabled={isPast}
                className={cn(
                  'relative aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all',
                  isPast && 'text-gray-300 cursor-default',
                  !isPast && !isBlocked && 'hover:bg-brand-50 text-gray-700',
                  !isPast && (isSat || isSun) && !isBlocked && 'text-brand-600',
                  isTodayDate && !isBlocked && 'ring-2 ring-brand-300 text-brand-700',
                  isBlocked && !isPast && 'bg-red-100 text-red-600 hover:bg-red-200 line-through',
                )}
              >
                {format(day, 'd')}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 mt-5 pt-4 border-t border-gray-100 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-md bg-white border border-gray-200" />
            Available
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-md bg-red-100 border border-red-200" />
            Blocked
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-md bg-gray-100" />
            Past
          </div>
          <div className="ml-auto font-medium text-gray-600">
            {blockedThisMonth > 0 ? `${blockedThisMonth} day${blockedThisMonth !== 1 ? 's' : ''} blocked this month` : 'All days open'}
          </div>
        </div>
      </div>

      {/* Total blocked summary */}
      {blockedDates.size > 0 && (
        <div className="mt-3 px-1 text-sm text-gray-500">
          {blockedDates.size} total day{blockedDates.size !== 1 ? 's' : ''} blocked across all months.
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <RotateCcw size={15} /> Clear All
        </button>
        <button
          onClick={handleSave}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors',
            saved
              ? 'bg-forest-500 text-white'
              : 'bg-brand-500 hover:bg-brand-600 text-white'
          )}
        >
          <Save size={15} />
          {saved ? '✓ Saved!' : 'Save Availability'}
        </button>
      </div>

      {/* Tip */}
      <p className="text-xs text-gray-400 mt-4 text-center">
        Tip: Block recurring days by clicking them one by one, or use "Clear All" to reopen everything.
      </p>
    </div>
  )
}
