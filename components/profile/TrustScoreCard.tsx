import { User } from '@/lib/types'
import { calcTrustScore, trustLabel } from '@/lib/utils/trust-score'
import { Shield, Mail, Phone, CreditCard, CheckCircle2 } from 'lucide-react'

const BADGE_ICONS: Record<string, React.ReactNode> = {
  email:   <Mail size={14} />,
  phone:   <Phone size={14} />,
  id:      <CheckCircle2 size={14} />,
  payment: <CreditCard size={14} />,
  social:  <Shield size={14} />,
}
const BADGE_LABELS: Record<string, string> = {
  email: 'Email Verified', phone: 'Phone Verified', id: 'ID Verified', payment: 'Payment Verified', social: 'Social Linked',
}

export default function TrustScoreCard({ user }: { user: User }) {
  const breakdown = calcTrustScore(user)
  const { label, color } = trustLabel(breakdown.total)

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Trust Score</h3>
        <span className={`text-sm font-semibold ${color}`}>{label}</span>
      </div>

      {/* Score bar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-700"
            style={{ width: `${breakdown.total}%` }}
          />
        </div>
        <span className="text-2xl font-extrabold text-gray-900">{breakdown.total}</span>
      </div>

      {/* Badges */}
      <div className="space-y-2">
        {(['email', 'phone', 'id', 'payment', 'social'] as const).map((badge) => {
          const earned = user.badges.includes(badge)
          return (
            <div key={badge} className={`flex items-center gap-2 text-sm ${earned ? 'text-gray-700' : 'text-gray-300'}`}>
              <span className={earned ? 'text-forest-600' : 'text-gray-300'}>{BADGE_ICONS[badge]}</span>
              <span className={earned ? '' : 'line-through'}>{BADGE_LABELS[badge]}</span>
              {earned && <span className="ml-auto text-xs text-forest-600 font-medium">✓</span>}
            </div>
          )
        })}
      </div>

      {user.badges.length < 4 && (
        <div className="mt-4 p-3 bg-brand-50 rounded-xl text-xs text-brand-700">
          <p className="font-semibold mb-0.5">Boost your trust score</p>
          <p>Verify your ID to unlock more rental requests and earn more.</p>
        </div>
      )}
    </div>
  )
}
