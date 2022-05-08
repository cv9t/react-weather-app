import React from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Tabs, Typography, CircularProgress } from '@mui/material'
import { Container, StyledTab, LoaderWrapper } from './LocationWeather.styled'
import { useWeatherForecast } from '../../hooks'
import { LocationType } from '../../types'
import { TabPanel, TodayView, HourlyView, DailyView } from '../../components'

function LocationWeather() {
  const location = useLocation().state as LocationType
  const [weatherView, setWeatherView] = React.useState(0)
  const [weatherForecast, weatherForecastLoading] = useWeatherForecast(location)

  const handleWeatherViewChange = (_: React.SyntheticEvent, value: number) => {
    setWeatherView(value)
  }

  if (weatherForecastLoading) {
    return (
      <LoaderWrapper>
        <CircularProgress />
        <Typography mt={2}>Searching for the weather... 🕵️</Typography>
      </LoaderWrapper>
    )
  }

  return (
    <Container>
      {weatherForecast ? (
        <>
          <Box sx={{ marginTop: -2, borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={weatherView} onChange={handleWeatherViewChange}>
              <StyledTab label="Today" disableRipple />
              <StyledTab label="Hourly" disableRipple />
              <StyledTab label="Daily" disableRipple />
            </Tabs>
          </Box>
          <TabPanel value={weatherView} index={0}>
            <TodayView
              location={location}
              todayWeather={weatherForecast.daily[0]}
              tomorrowWeather={weatherForecast.daily[1]}
              nextHourWeather={weatherForecast.hourly[1]}
              alerts={weatherForecast.alerts}
            />
          </TabPanel>
          <TabPanel value={weatherView} index={1}>
            <HourlyView
              hourlyWeatherForecast={weatherForecast.hourly}
              alerts={weatherForecast.alerts}
            />
          </TabPanel>
          <TabPanel value={weatherView} index={2}>
            <DailyView
              dailyWeatherForecast={weatherForecast.daily}
              alerts={weatherForecast.alerts}
            />
          </TabPanel>
        </>
      ) : (
        <>
          <Typography variant="h5" align="center" mb={1}>
            We can&apos;t get the weather forecast for the current location you are looking for. 😔
          </Typography>
          <Typography color="text.secondary" align="center">
            Try to reload the page or search another location.
          </Typography>
        </>
      )}
    </Container>
  )
}

export { LocationWeather }
