import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import { useRecentLocations, useWeatherForecast } from '../../hooks'
import { Container, RecentLocationsContainer } from './Home.styled'
import { LocationSearchBar, LocationWidget } from '../../components'
import { LocationType } from '../../types'

function Home() {
  const { recentLocations, saveRecentLocation } = useRecentLocations()
  const [weatherForecasts, weatherForecastsLoading] = useWeatherForecast(recentLocations)
  const navigate = useNavigate()

  const handleLocationSelect = (location: LocationType) => {
    saveRecentLocation(location)
    navigate(`location/${location.placeId}`, { state: location })
  }

  return (
    <Container>
      <Typography variant="h3" mb={5}>
        React Weather App
      </Typography>
      <LocationSearchBar onSelect={handleLocationSelect} />
      <RecentLocationsContainer>
        {recentLocations.map((location, idx) => (
          <LocationWidget
            key={location.placeId}
            location={location}
            weather={weatherForecasts?.[idx].current}
            alerts={weatherForecasts?.[idx].alerts}
            onClick={handleLocationSelect}
            loading={weatherForecastsLoading}
            variant="contained"
          />
        ))}
      </RecentLocationsContainer>
    </Container>
  )
}

export { Home }
