'use client'
import { Download } from 'lucide-react'

export interface CsvRow {
  bookingId: string
  listingTitle: string
  startDate: string
  endDate: string
  days: number
  grossCents: number
  feeCents: number
  netCents: number
}

function centsToDollars(cents: number) {
  return (cents / 100).toFixed(2)
}

function buildCsv(rows: CsvRow[]): string {
  const headers = [
    'Booking ID',
    'Listing',
    'Start Date',
    'End Date',
    'Days',
    'Gross ($)',
    'Platform Fee ($)',
    'Net Payout ($)',
  ]
  const lines = rows.map(r => [
    r.bookingId,
    `"${r.listingTitle.replace(/"/g, '""')}"`,
    r.startDate,
    r.endDate,
    r.days,
    centsToDollars(r.grossCents),
    centsToDollars(r.feeCents),
    centsToDollars(r.netCents),
  ].join(','))
  return [headers.join(','), ...lines].join('\n')
}

export default function ExportCsvButton({ rows }: { rows: CsvRow[] }) {
  function handleExport() {
    const csv = buildCsv(rows)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `toolshed-earnings-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-semibold rounded-xl transition-colors"
    >
      <Download size={15} />Export CSV
    </button>
  )
}
