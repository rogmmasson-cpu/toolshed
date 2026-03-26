import { cn } from '@/lib/utils/cn'
import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  count?: number
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
  className?: string
}

const sizes = { sm: 12, md: 14, lg: 18 }

export default function StarRating({ rating, count, size = 'sm', showCount = true, className }: StarRatingProps) {
  const px = sizes[size]
  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <Star size={px} className="fill-brand-400 text-brand-400" />
      <span className={cn('font-semibold text-gray-900', size === 'lg' ? 'text-base' : 'text-sm')}>
        {rating.toFixed(1)}
      </span>
      {showCount && count !== undefined && (
        <span className="text-gray-500 text-xs">({count})</span>
      )}
    </span>
  )
}
