import Link from 'next/link'
import { ArrowLeft, DollarSign, TrendingUp } from 'lucide-react'
import { getBookingsByOwner } from '@/lib/mock-db/bookings'
import { getListingById } from '@/lib/mock-db/listings'
import { formatCents, formatDateRange } from '@/lib/utils/formatting'
import ExportCsvButton from '@/components/dashboard/ExportCsvButton'
import type { CsvRow } from '@/components/dashboard/ExportCsvButton'

const MOCK_MONTHLY = [
  { month: 'Nov', amount: 4200 },
  { month: 'Dec', amount: 8100 },
  { month: 'Jan', amount: 3500 },
  { month: 'Feb', amount: 9800 },
  { month: 'Mar', amount: 6200 },
  { month: 'Apr', amount: 2100 },
]

export default async function EarningsPage() {
  // Use David's bookings (more data) to illustrate the earnings page
  const bookings = await getBookingsByOwner('usr_3')
  const completed = bookings.filter(b => b.status === 'completed')
  const totalGross = completed.reduce((s, b) => s + b.pricing.subtotal, 0)
  const totalFees  = completed.reduce((s, b) => s + b.pricing.platformFee, 0)
  const totalNet   = totalGross - totalFees

  const listings = await Promise.all(completed.map(b => getListingById(b.listingId)))
  const byId = Object.fromEntries(completed.map((b, i) => [b.id, listings[i]]))

  const csvRows: CsvRow[] = completed.map(b => ({
    bookingId: b.id,
    listingTitle: byId[b.id]?.title ?? 'Unknown',
    startDate: b.dates.startDate,
    endDate: b.dates.endDate,
    days: b.dates.totalDays,
    grossCents: b.pricing.subtotal,
    feeCents: b.pricing.platformFee,
    netCents: b.pricing.subtotal - b.pricing.platformFee,
  }))

  const max = Math.max(...MOCK_MONTHLY.map(m => m.amount))

  return (
    <div className="container-app py-8 max-w-3xl">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-xl text-gray-500">
            <ArrowLeft size={18}/>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
        </div>
        <ExportCsvButton rows={csvRows} />
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Gross Revenue', value: formatCents(totalGross), icon: <DollarSign size={18}/>, color: 'text-forest-600 bg-forest-50' },
          { label: 'Platform Fees', value: formatCents(totalFees),  icon: <TrendingUp size={18}/>, color: 'text-yellow-600 bg-yellow-50' },
          { label: 'Net Payout',    value: formatCents(totalNet),   icon: <DollarSign size={18}/>, color: 'text-brand-600 bg-brand-50' },
        ].map(s => (
          <div key={s.label} className="card p-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>{s.icon}</div>
            <p className="text-xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="card p-5 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Monthly Earnings (Last 6 Months)</h2>
        <div className="flex items-end gap-2 h-32">
          {MOCK_MONTHLY.map(m => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-gray-500">{formatCents(m.amount)}</span>
              <div
                className="w-full bg-brand-400 rounded-t-lg transition-all duration-700"
                style={{ height: `${(m.amount / max) * 80}px` }}
              />
              <span className="text-xs text-gray-500">{m.month}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>6-month total: <span className="font-semibold text-gray-900">{formatCents(MOCK_MONTHLY.reduce((s,m) => s+m.amount,0))}</span></span>
          <span className="text-forest-600 font-medium">↑ 18% vs prior period</span>
        </div>
      </div>

      {/* Transaction history */}
      <div className="card p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Transaction History</h2>
        {completed.length === 0 ? (
          <p className="text-gray-500 text-sm">No completed rentals yet.</p>
        ) : (
          <div className="space-y-3">
            {completed.map(b => (
              <div key={b.id} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
                {byId[b.id]?.photos[0] && (
                  <img src={byId[b.id]!.photos[0]} alt="" className="w-12 h-10 rounded-lg object-cover flex-shrink-0"/>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{byId[b.id]?.title}</p>
                  <p className="text-xs text-gray-500">{formatDateRange(b.dates.startDate, b.dates.endDate)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-forest-700">+ {formatCents(b.pricing.subtotal * 0.9)}</p>
                  <p className="text-xs text-gray-400">after 10% fee</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-brand-50 border border-brand-200 rounded-2xl text-sm text-brand-700">
        <p className="font-semibold mb-1">💰 Stripe Payouts</p>
        <p>Payouts are sent to your linked bank account within 2 business days of each completed rental. <a href="#" className="underline font-medium">Manage payout settings →</a></p>
      </div>
    </div>
  )
}
