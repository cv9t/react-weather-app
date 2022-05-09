import React from 'react'
import { Typography } from '@mui/material'
import {
  CurrentWeatherType,
  DailyWeatherType,
  HourlyWeatherType,
  LocationType,
  WeatherAlertType,
} from '../../types'
import { Container } from './TodayView.styled'
import { AlertList, CurrentWeatherCard, DayWeatherCard, HourWeatherCard } from '../UI'

interface TodayViewProps {
  location: LocationType
  currentWeather: CurrentWeatherType
  nextHourWeather: HourlyWeatherType
  tomorrowWeather: DailyWeatherType
  alerts: WeatherAlertType[]
}

function TodayView({
  location,
  currentWeather,
  nextHourWeather,
  tomorrowWeather,
  alerts,
}: TodayViewProps) {
  const currentAlerts = alerts.filter((alert) =>
    alert.start.clone().startOf('day').isSame(currentWeather.dt.clone().startOf('day'))
  )
  const tomorrowAlerts = alerts.filter((alert) =>
    tomorrowWeather.dt.isBetween(alert.start, alert.end, 'date', '[]')
  )
  const nextHourAlerts = alerts.filter((alert) =>
    nextHourWeather.dt.isBetween(alert.start, alert.end, 'hour', '[]')
  )

  return (
    <Container>
      <Typography variant="h6" lineHeight={1} mb={0.5}>
        Weather for today
      </Typography>
      <Typography fontWeight={500} mb={1.5} color="text.secondary">
        {location.description}
      </Typography>
      <AlertList alerts={currentAlerts} />
      <CurrentWeatherCard weather={currentWeather} />
      <Typography variant="h6" mb={1.5}>
        Weather for the next hour
      </Typography>
      <HourWeatherCard weather={nextHourWeather} alerts={nextHourAlerts} />
      <Typography variant="h6" mb={1.5}>
        Weather for tomorrow
      </Typography>
      <DayWeatherCard weather={tomorrowWeather} alerts={tomorrowAlerts} />
      {/* {todayAlerts.length > 0 && (
        <AlertsContainer>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WarningIcon color="error" sx={{ marginRight: 1 }} />
            <Typography textTransform="uppercase">Alerts</Typography>
          </Box>
          <Divider color={grey[300]} sx={{ margin: '10px 0 12px' }} />
          {todayAlerts.map((alert, idx) => (
            <AlertWrapper key={idx}>
              <Typography fontWeight={500} lineHeight={1}>
                {alert.event}
              </Typography>
              <Typography>
                {`${alert.start.format('h:mm A dddd')} - ${alert.end.format('h:mm A dddd')}`}
              </Typography>
            </AlertWrapper>
          ))}
        </AlertsContainer>
      )}
      <Box mb={2}>
        <CurrentWeatherCard weather={weather} />
      </Box>
      <Typography variant="h6" mb={2}>
        Tomorrow&apos;s Weather Forecast
      </Typography>
      <DayWeatherCard weather={tomorrowWeather} alerts={alerts} /> */}
    </Container>
  )
}

export { TodayView }
