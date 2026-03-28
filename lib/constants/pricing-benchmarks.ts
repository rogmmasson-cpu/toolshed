import { ToolCategory } from '@/lib/types'

export interface PricingBenchmark {
  category: ToolCategory
  dailyRateMinPct: number  // % of retail value
  dailyRateMaxPct: number
  depositPct: number        // recommended deposit % of retail
}

export const PRICING_BENCHMARKS: Record<ToolCategory, PricingBenchmark> = {
  'power-tools':  { category: 'power-tools',  dailyRateMinPct: 0.008, dailyRateMaxPct: 0.015, depositPct: 0.15 },
  'hand-tools':   { category: 'hand-tools',   dailyRateMinPct: 0.005, dailyRateMaxPct: 0.010, depositPct: 0.10 },
  'garden':       { category: 'garden',       dailyRateMinPct: 0.006, dailyRateMaxPct: 0.012, depositPct: 0.12 },
  'cleaning':     { category: 'cleaning',     dailyRateMinPct: 0.010, dailyRateMaxPct: 0.018, depositPct: 0.15 },
  'automotive':   { category: 'automotive',   dailyRateMinPct: 0.010, dailyRateMaxPct: 0.018, depositPct: 0.18 },
  'construction': { category: 'construction', dailyRateMinPct: 0.010, dailyRateMaxPct: 0.020, depositPct: 0.20 },
  'painting':     { category: 'painting',     dailyRateMinPct: 0.007, dailyRateMaxPct: 0.013, depositPct: 0.12 },
  'plumbing':     { category: 'plumbing',     dailyRateMinPct: 0.008, dailyRateMaxPct: 0.015, depositPct: 0.15 },
  'electrical':   { category: 'electrical',   dailyRateMinPct: 0.008, dailyRateMaxPct: 0.014, depositPct: 0.15 },
  'moving':       { category: 'moving',       dailyRateMinPct: 0.015, dailyRateMaxPct: 0.025, depositPct: 0.12 },
  'outdoor':      { category: 'outdoor',      dailyRateMinPct: 0.008, dailyRateMaxPct: 0.015, depositPct: 0.12 },
  'kitchen':        { category: 'kitchen',        dailyRateMinPct: 0.004, dailyRateMaxPct: 0.008, depositPct: 0.10 },
  'party-rentals':  { category: 'party-rentals',  dailyRateMinPct: 0.012, dailyRateMaxPct: 0.022, depositPct: 0.20 },
  'kids':           { category: 'kids',           dailyRateMinPct: 0.008, dailyRateMaxPct: 0.015, depositPct: 0.15 },
  'trailers':       { category: 'trailers',       dailyRateMinPct: 0.015, dailyRateMaxPct: 0.030, depositPct: 0.25 },
  'other':          { category: 'other',          dailyRateMinPct: 0.007, dailyRateMaxPct: 0.013, depositPct: 0.13 },
}

export const PLATFORM_FEE_PCT = 0.10       // 10% of subtotal
export const WEEKLY_DISCOUNT_PCT = 0.28    // 28% off daily rate × 7
export const MONTHLY_DISCOUNT_PCT = 0.50   // 50% off daily rate × 30
export const INSURANCE_DAILY_RATE = 299    // $2.99/day in cents
