import React from 'react'
import { useSnackbar } from 'notistack'
import { Skeleton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { LocationSearchBar, RecentLocationWidget } from '../../components'
import { useRecentLocations, useFetch } from '../../hooks'
import { WeatherService } from '../../service'
import { LocationType, WeatherDataType } from '../../types'
import { HomeContainer, RecentLocationsContainer } from './Home.styled'

function Home() {
  const { recentLocations, saveRecentLocation } = useRecentLocations()
  const [recentLocationsWeather, setRecentLocationsWeather] = React.useState<WeatherDataType[]>([])
  const [
    recentLocationsWeatherFetch,
    isRecentLocationsWeatherFetchLoading,
    isRecentLocationsWeatherFetchError,
  ] = useFetch(async () => {
    const promises = []
    for (let i = 0; i < recentLocations.length; i += 1) {
      promises.push(WeatherService.getOneCallWeatherForecast(recentLocations[i].coords))
    }
    const fetchedRecentLocationsWeather = await Promise.all(promises)
    setRecentLocationsWeather(fetchedRecentLocationsWeather)
  })
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isRecentLocationsWeatherFetchError) {
      enqueueSnackbar("Can't fetch recent locations weather", { variant: 'error' })
    }
  }, [isRecentLocationsWeatherFetchError])

  React.useEffect(() => {
    recentLocationsWeatherFetch()
  }, [recentLocations])

  const handleLocationSearchBarSelect = (location: LocationType) => {
    saveRecentLocation(location)
    navigate(`location/${location.placeId}`, { state: location })
  }

  const handleRecentLocationClick = (location: LocationType) => {
    saveRecentLocation(location)
    navigate(`location/${location.placeId}`, { state: location })
  }

  const renderRecentLocations = () => {
    if (isRecentLocationsWeatherFetchError) return null

    if (isRecentLocationsWeatherFetchLoading) {
      return recentLocations.map((_, idx) => (
        <Skeleton
          key={idx}
          variant="rectangular"
          animation="wave"
          width={220}
          height={40}
          sx={{ borderRadius: '4px' }}
        />
      ))
    }

    if (recentLocationsWeather.length === 0 || recentLocations.length === 0) return null

    return recentLocations.map((location, idx) => (
      <RecentLocationWidget
        key={location.description}
        location={location}
        weather={recentLocationsWeather[idx]}
        onClick={handleRecentLocationClick}
        variant="contained"
      />
    ))
  }

  return (
    <HomeContainer>
      <Typography variant="h3" mb={5}>
        React Weather App
      </Typography>
      <LocationSearchBar onSelect={handleLocationSearchBarSelect} placeholder="Search city" />
      <RecentLocationsContainer>{renderRecentLocations()}</RecentLocationsContainer>
    </HomeContainer>
  )
}

export { Home }
