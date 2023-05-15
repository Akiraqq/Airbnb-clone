'use client'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Listing, Reservation } from '@prisma/client'

import { SafeUser } from '../types'
import Container from '../componenst/Container'
import Heading from '../componenst/Heading'
import ListingCard from '../componenst/listings/ListingCard'

interface ReservationsClientProps {
  currentUser?: SafeUser | null
  reservations: (Reservation & {
    listing: Listing
  })[]
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled')
          router.refresh()
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error || 'Something went wrong')
        })
        .finally(() => setDeletingId(''))
    },
    [router]
  )

  return (
    <Container>
      <Heading title="Reservations" subtitle="Booking on your properties" />
      <div
        className="
      mt-10
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      gap-8
      "
      >
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default ReservationsClient