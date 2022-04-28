import React from 'react'
import { useSnackbar } from 'notistack'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Container, Box, Toolbar, Skeleton } from '@mui/material'
import { LocationSearchBar } from '..'
import { useFetch, useRecentLocations } from '../../hooks'
import { LocationType, WeatherDataType } from '../../types'
import { WeatherService } from '../../service'
import { StyledAppBar, StyledTypography } from './Header.styled'
import { RecentLocationWidget } from '../UI'

function Header() {
  const { recentLocations, saveRecentLocation } = useRecentLocations()
  const [recentLocationWeather, setRecentLocationWeather] = React.useState<WeatherDataType>()
  const [
    recentLocationWeatherFetch,
    isRecentLocationWeatherFetchLoading,
    isRecentLocationWeatherFetchError,
  ] = useFetch(async () => {
    const fetchedRecentLocationWeather = await WeatherService.getOneCallWeatherForecast(
      recentLocations[1].coords
    )
    setRecentLocationWeather(fetchedRecentLocationWeather)
  })
  const navigate = useNavigate()
  const { locationId } = useParams<'locationId'>()
  const { enqueueSnackbar } = useSnackbar()

  React.useEffect(() => {
    recentLocationWeatherFetch()
  }, [recentLocations])

  React.useEffect(() => {
    if (isRecentLocationWeatherFetchError) {
      enqueueSnackbar("Can't fetch recent location weather", { variant: 'error' })
    }
  }, [isRecentLocationWeatherFetchError])

  const handleLocationSearchBarSelect = (location: LocationType) => {
    if (locationId !== location.placeId) {
      saveRecentLocation(location)
      navigate(`location/${location.placeId}`, { state: location })
    }
  }

  const handleRecentLocationClick = () => {
    saveRecentLocation(recentLocations[1])
    navigate(`location/${recentLocations[1].placeId}`, { state: recentLocations[1] })
  }

  const renderRecentLocation = () => {
    if (isRecentLocationWeatherFetchLoading) {
      return (
        <Skeleton
          variant="text"
          animation="wave"
          width={220}
          height={40}
          sx={{ borderRadius: '4px' }}
        />
      )
    }

    if (!recentLocationWeather) return null

    return (
      <RecentLocationWidget
        location={recentLocations[1]}
        weather={recentLocationWeather}
        onClick={handleRecentLocationClick}
        withoutAlerts
      />
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar>
            <StyledTypography variant="h5">
              <Link to="/">React Weather App</Link>
            </StyledTypography>

            {renderRecentLocation()}

            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <LocationSearchBar
                onSelect={handleLocationSearchBarSelect}
                placeholder="Search City"
              />
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
    </Box>
  )
}

export { Header }
