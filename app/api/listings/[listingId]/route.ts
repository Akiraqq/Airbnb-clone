import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

interface IParams {
  listingId?: string
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const curretUser = await getCurrentUser()

  if (!curretUser) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID')
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: curretUser.id,
    },
  })

  return NextResponse.json(listing)
}
