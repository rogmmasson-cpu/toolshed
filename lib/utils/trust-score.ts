import { User, TrustScoreBreakdown } from '@/lib/types'

export function calcTrustScore(user: User): TrustScoreBreakdown {
  const emailVerified  = user.badges.includes('email')   ? 10 : 0
  const phoneVerified  = user.badges.includes('phone')   ? 15 : 0
  const idVerified     = user.badges.includes('id')      ? 25 : 0
  const paymentVerified = user.badges.includes('payment') ? 10 : 0
  const reviewScore    = Math.round((user.trustScore / 100) * 25)
  const rentalHistory  = Math.round(Math.min((user.totalRentals + user.totalLends) / 20, 1) * 10)
  const responseRate   = Math.round(user.responseRate * 5)
  const total = emailVerified + phoneVerified + idVerified + paymentVerified + reviewScore + rentalHistory + responseRate
  return {
    total: Math.min(total, 100),
    components: { emailVerified, phoneVerified, idVerified, paymentVerified, reviewScore, rentalHistory, responseRate },
  }
}

export function trustLabel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: 'Highly Trusted', color: 'text-green-600' }
  if (score >= 60) return { label: 'Trusted',        color: 'text-blue-600' }
  if (score >= 40) return { label: 'Verified',       color: 'text-yellow-600' }
  return              { label: 'New Member',         color: 'text-gray-500' }
}
