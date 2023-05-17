'use client'

import { User } from '@prisma/client'
import { IconType } from 'react-icons'
import dynamic from 'next/dynamic'

import useCountries from '@/app/hooks/useCountries'
import Avatar from '../Avatar'
import ListingCategory from './ListingCategory'

const Map = dynamic(() => import('../Map'), {
  ssr: false,
})

interface ListingInfoProps {
  user: User
  description: string
  guestCount: number
  roomCount: number
  bathroomCount: number
  category:
    | {
        icon: IconType
        label: string
        description: string
      }
    | undefined
  locationValue: string
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries()

  const coordinates = getByValue(locationValue)?.latlng
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
        text-xl
        font-semibold
        flex 
        flex-row
        items-center
        gap-2
        "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user.image} />
        </div>
        <div
          className="
        flex
        flex-row
        items-center
        gap-4
        font-light
        text-neutral-500"
        >
          <div>
            {guestCount}
            {guestCount > 1 ? ' guests' : ' guest'}
          </div>
          <div>
            {roomCount}
            {roomCount > 1 ? ' rooms' : ' room'}
          </div>
          <div>
            {bathroomCount}
            {bathroomCount > 1 ? ' bathrooms' : ' bathroom'}
          </div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  )
}

export default ListingInfo
