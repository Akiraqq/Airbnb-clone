'use client'

import { Listing } from '@prisma/client'

import { SafeUser } from '../types'
import Container from '../componenst/Container'
import Heading from '../componenst/Heading'
import ListingCard from '../componenst/listings/ListingCard'

interface FavoritesClientProps {
  favorites: Listing[]
  currentUser?: SafeUser | null
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  favorites,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited!"
      />
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
        {favorites.map((favorite) => (
          <ListingCard
            key={favorite.id}
            data={favorite}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default FavoritesClient
