'use client'

import { Listing, Reservation, User } from '@prisma/client'
import { useMemo } from 'react'

import { SafeUser } from '@/app/types'
import { categories } from '@/app/componenst/navbar/Categories'
import Container from '@/app/componenst/Container'
import ListingHead from '@/app/componenst/listings/ListingHead'
import ListingInfo from '@/app/componenst/listings/ListingInfo'

interface ListingClientProps {
  reservations?: Reservation[]
  listing: Listing & {
    user: User
  }
  currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
  reservations,
  listing,
  currentUser,
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  }, [listing.category])

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
          grid
          grid-cols-1
          md:grid-cols-7
          md:gap-10
          mt-6
          "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
