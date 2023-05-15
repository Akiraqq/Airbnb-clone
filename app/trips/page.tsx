import getCurrentUser from '../actions/getCurrentUser'
import EmptyState from '../componenst/EmptyState'
import getReservations from '../actions/getReservations'
import TripsClient from './TripsClient'

const TripsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  })

  if (!reservations) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you havent reserved any trips."
      />
    )
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />
}

export default TripsPage
