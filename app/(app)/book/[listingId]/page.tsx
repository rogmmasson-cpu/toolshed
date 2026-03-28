import { notFound } from 'next/navigation'
import { getListingById } from '@/lib/mock-db/listings'
import BookingFlow from '@/components/booking/BookingFlow'

interface Props {
  params: Promise<{ listingId: string }>
  searchParams: Promise<{ start?: string; end?: string }>
}

export default async function BookingPage({ params, searchParams }: Props) {
  const { listingId } = await params
  const sp = await searchParams

  const listing = await getListingById(listingId)
  if (!listing) notFound()

  return (
    <BookingFlow
      listing={listing}
      startDate={sp.start ?? ''}
      endDate={sp.end ?? ''}
    />
  )
}
