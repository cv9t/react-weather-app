import React from 'react'
import { useLocation } from 'react-router-dom'
import { LocationType } from '../../types'

function LocationWeather() {
  const location = useLocation().state as LocationType

  return (
    <div>
      description: {location.description} coords: {`${location.coords.lat}, ${location.coords.lng}`}
    </div>
  )
}

export { LocationWeather }
