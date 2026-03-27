import { ToolCategory, SmartPricingSuggestion } from '@/lib/types'
import {
  PRICING_BENCHMARKS,
  PLATFORM_FEE_PCT,
  WEEKLY_DISCOUNT_PCT,
  MONTHLY_DISCOUNT_PCT,
  INSURANCE_DAILY_RATE,
} from '@/lib/constants/pricing-benchmarks'

export function getSmartPricingSuggestion(
  retailValue: number,
  category: ToolCategory
): SmartPricingSuggestion {
  const benchmark = PRICING_BENCHMARKS[category]
  const midPct = (benchmark.dailyRateMinPct + benchmark.dailyRateMaxPct) / 2
  const suggestedDailyRate = Math.round(retailValue * midPct)
  const suggestedWeeklyRate = Math.round(suggestedDailyRate * 7 * (1 - WEEKLY_DISCOUNT_PCT))
  const suggestedDepositRate = Math.max(
    Math.round(retailValue * benchmark.depositPct),
    suggestedDailyRate * 3
  )
  return {
    retailValue,
    suggestedDailyRate,
    suggestedWeeklyRate,
    suggestedDepositRate,
    categoryBenchmarkLow: Math.round(retailValue * benchmark.dailyRateMinPct),
    categoryBenchmarkHigh: Math.round(retailValue * benchmark.dailyRateMaxPct),
    competitivenessScore:
      suggestedDailyRate <= Math.round(retailValue * benchmark.dailyRateMinPct)
        ? 'competitive'
        : suggestedDailyRate <= Math.round(retailValue * benchmark.dailyRateMaxPct)
        ? 'fair'
        : 'low',
  }
}

export interface BookingPricing {
  dailyRate: number
  totalDays: number
  subtotal: number
  platformFee: number
  insuranceFee: number
  depositAmount: number
  totalCharge: number
  totalWithDeposit: number
}

export function calcBookingPricing(
  dailyRate: number,
  totalDays: number,
  depositAmount: number,
  insuranceEnrolled: boolean,
  weekendRate?: number | null,
  startDate?: string | null
): BookingPricing {
  let subtotal: number
  if (weekendRate && startDate) {
    subtotal = 0
    const start = new Date(startDate + 'T00:00:00')
    for (let i = 0; i < totalDays; i++) {
      const d = new Date(start)
      d.setDate(d.getDate() + i)
      const dow = d.getDay()
      subtotal += (dow === 0 || dow === 5 || dow === 6) ? weekendRate : dailyRate
    }
  } else {
    subtotal = dailyRate * totalDays
  }
  const platformFee = Math.round(subtotal * PLATFORM_FEE_PCT)
  const insuranceFee = insuranceEnrolled ? INSURANCE_DAILY_RATE * totalDays : 0
  const totalCharge = subtotal + platformFee + insuranceFee
  return {
    dailyRate,
    totalDays,
    subtotal,
    platformFee,
    insuranceFee,
    depositAmount,
    totalCharge,
    totalWithDeposit: totalCharge + depositAmount,
  }
}

export function calcEffectiveRate(
  dailyRate: number,
  weeklyRate: number | null,
  monthlyRate: number | null,
  days: number
): number {
  if (days >= 30 && monthlyRate !== null) {
    return Math.round((monthlyRate / 30) * days)
  }
  if (days >= 7 && weeklyRate !== null) {
    const weeks = Math.floor(days / 7)
    const rem = days % 7
    return weeklyRate * weeks + dailyRate * rem
  }
  return dailyRate * days
}

export const INSURANCE_DAILY_CENTS = INSURANCE_DAILY_RATE
