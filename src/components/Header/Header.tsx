import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Container, Box, Toolbar } from '@mui/material'
import { useRecentLocations, useWeatherForecast } from '../../hooks'
import { StyledAppBar, StyledTypography } from './Header.styled'
import { LocationSearchBar, LocationWidget } from '../UI'
import { LocationType } from '../../types'

function Header() {
  const navigate = useNavigate()
  const { locationId } = useParams<'locationId'>()
  const { recentLocations, saveRecentLocation } = useRecentLocations()
  const [weatherForecast, weatherForecastLoading] = useWeatherForecast(recentLocations[1])

  const handleRecentLocationClick = () => {
    saveRecentLocation(recentLocations[1])
    navigate(`location/${recentLocations[1].placeId}`, { state: recentLocations[1] })
  }

  const handleLocationSearchBarSelect = (location: LocationType) => {
    if (locationId !== location.placeId) {
      saveRecentLocation(location)
      navigate(`location/${location.placeId}`, { state: location })
    }
  }

  return (
    <StyledAppBar position="fixed">
      <Container maxWidth="md">
        <Toolbar>
          <StyledTypography variant="h5">
            <Link to="/">React Weather App</Link>
          </StyledTypography>
          <LocationWidget
            location={recentLocations[1]}
            weather={weatherForecast?.current}
            onClick={handleRecentLocationClick}
            loading={weatherForecastLoading}
            variant="text"
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <LocationSearchBar onSelect={handleLocationSearchBarSelect} placeholder="Search City" />
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  )
}

export { Header }
