import { User } from '@/lib/types'
import { Mail, Phone, CheckCircle2, Shield } from 'lucide-react'

const BADGE_ICONS: Record<string, React.ReactNode> = {
  email:   <Mail size={14} />,
  phone:   <Phone size={14} />,
  id:      <CheckCircle2 size={14} />,
  social:  <Shield size={14} />,
}
const BADGE_LABELS: Record<string, string> = {
  email: 'Email Verified', phone: 'Phone Verified', id: 'ID Verified', social: 'Social Linked',
}

export default function TrustScoreCard({ user }: { user: User }) {
  const earnedCount = user.badges.filter(b => ['email', 'phone', 'id', 'social'].includes(b)).length

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Verified Profile</h3>
        <span className="text-sm font-semibold text-forest-600">{earnedCount}/4 verified</span>
      </div>

      <div className="space-y-2">
        {(['email', 'phone', 'id', 'social'] as const).map((badge) => {
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

      {earnedCount < 3 && (
        <div className="mt-4 p-3 bg-brand-50 rounded-xl text-xs text-brand-700">
          <p className="font-semibold mb-0.5">Complete your profile</p>
          <p>Verify your ID to unlock more rental requests and build trust with other members.</p>
        </div>
      )}
    </div>
  )
}
