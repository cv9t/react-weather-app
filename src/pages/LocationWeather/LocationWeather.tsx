import React from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Tabs, Typography, CircularProgress } from '@mui/material'
import { useLocationWeather } from '../../hooks'
import { LocationType } from '../../types'
import { LocationWeatherContainer, StyledTab, LoaderWrapper } from './LocationWeather.styled'
import { TabPanel, DailyView, TodayView, HourlyView } from '../../components'

function LocationWeather() {
  const location = useLocation().state as LocationType
  const [weatherView, setWeatherView] = React.useState(2)
  const [locationWeather, locationWeatherLoading] = useLocationWeather(location)

  const handleWeatherViewChange = (_: React.SyntheticEvent, value: number) => {
    setWeatherView(value)
  }

  if (locationWeatherLoading) {
    return (
      <LoaderWrapper>
        <CircularProgress />
        <Typography mt={2}>Searching for the weather... 🕵️</Typography>
      </LoaderWrapper>
    )
  }

  return (
    <LocationWeatherContainer>
      {locationWeather ? (
        <>
          <Box sx={{ marginTop: -2, borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={weatherView} onChange={handleWeatherViewChange}>
              <StyledTab label="Today" disableRipple />
              <StyledTab label="Hourly" disableRipple />
              <StyledTab label="Daily" disableRipple />
            </Tabs>
          </Box>

          <TabPanel value={weatherView} index={0}>
            <TodayView weatherData={locationWeather.current} />
          </TabPanel>
          <TabPanel value={weatherView} index={1}>
            <HourlyView weatherData={locationWeather.hourly} alerts={locationWeather.alerts} />
          </TabPanel>
          <TabPanel value={weatherView} index={2}>
            <DailyView weatherData={locationWeather.daily} alerts={locationWeather.alerts} />
          </TabPanel>
        </>
      ) : (
        <>
          <Typography variant="h5" align="center" mb={1}>
            We can&apos;t get the weather forecast for the current location you are looking for. 😔
          </Typography>
          <Typography color="text.secondary" align="center">
            Try to reload the page or search another location
          </Typography>
        </>
      )}
    </LocationWeatherContainer>
  )
}

export { LocationWeather }
