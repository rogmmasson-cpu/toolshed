import { notFound, redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { getListingById } from '@/lib/mock-db/listings'
import EditListingForm from '@/components/listings/EditListingForm'

interface Props { params: Promise<{ id: string }> }

export default async function EditListingPage({ params }: Props) {
  const { id } = await params
  const { userId } = await auth()
  if (!userId) redirect('/login')

  const listing = await getListingById(id)
  if (!listing) notFound()
  if (listing.ownerId !== userId) notFound()

  return <EditListingForm listing={listing} />
}
