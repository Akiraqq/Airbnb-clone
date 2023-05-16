import getCurrentUser from '../actions/getCurrentUser'
import getFavoriteListings from '../actions/getFavoriteListings'
import EmptyState from '../componenst/EmptyState'
import FavoritesClient from './FavoritesClient'

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser()
  const favorites = await getFavoriteListings()

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like your have no favorite listings"
      />
    )
  }

  return <FavoritesClient favorites={favorites} currentUser={currentUser} />
}

export default FavoritesPage
