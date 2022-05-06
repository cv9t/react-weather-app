import React from 'react'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { LocationSearchBar, LocationWidget } from '../../components'
import { useRecentLocations, useLocationWeather } from '../../hooks'
import { LocationType } from '../../types'
import { HomeContainer, RecentLocationsContainer } from './Home.styled'

function Home() {
  const { recentLocations, saveRecentLocation } = useRecentLocations()
  const [recentLocationsWeather, recentLocationsWeatherLoading] =
    useLocationWeather(recentLocations)
  const navigate = useNavigate()

  const handleLocationSelect = (location: LocationType) => {
    saveRecentLocation(location)
    navigate(`location/${location.placeId}`, { state: location })
  }

  return (
    <HomeContainer>
      <Typography variant="h3" mb={5}>
        React Weather App
      </Typography>

      <LocationSearchBar onSelect={handleLocationSelect} placeholder="Search city" />

      <RecentLocationsContainer>
        {recentLocations.map((location, idx) => (
          <LocationWidget
            key={location.placeId}
            location={location}
            weather={recentLocationsWeather?.[idx]}
            onClick={handleLocationSelect}
            loading={recentLocationsWeatherLoading}
            variant="contained"
          />
        ))}
      </RecentLocationsContainer>
    </HomeContainer>
  )
}

export { Home }
