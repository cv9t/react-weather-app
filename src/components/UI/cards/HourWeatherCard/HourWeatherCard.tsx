import React from 'react'
import { Typography } from '@mui/material'
import AirIcon from '@mui/icons-material/Air'
import OpacityIcon from '@mui/icons-material/Opacity'
import { HourlyWeatherType, WeatherAlertType } from '../../../../types'
import { WeatherCardBase } from '../WeatherCardBase'
import { WeatherCardHeaderParam, WeatherCardBodyParam } from '../shared/types'

interface HourWeatherCardProps {
  weather: HourlyWeatherType
  alerts: WeatherAlertType[]
  opened?: boolean
}

function HourWeatherCard({ weather, alerts, opened }: HourWeatherCardProps) {
  const headerParams: WeatherCardHeaderParam[] = [
    {
      title: 'Wind speed',
      icon: <AirIcon />,
      text: `${weather.wind_speed} m/s`,
    },
    {
      title: 'Probability of precipitation',
      icon: <OpacityIcon />,
      text: `${weather.pop}%`,
    },
  ]

  const bodyParams: WeatherCardBodyParam[] = [
    {
      title: 'Temperature',
      value: `${weather.temp}°`,
    },
    {
      title: 'Humidity',
      value: `${weather.humidity}%`,
    },
    {
      title: 'Cloudiness',
      value: `${weather.clouds}%`,
    },
    {
      title: 'Pressure',
      value: `${weather.pressure} hPa`,
    },
    {
      title: 'Visibility',
      value: `${weather.visibility} km`,
    },
    {
      title: 'Wind Gust',
      value: `${weather.wind_gust} m/s`,
    },
    {
      title: 'Wind Direction (Deg)',
      value: `${weather.wind_deg}°`,
    },
    {
      title: 'UV index',
      value: `${weather.uvi}`,
    },
  ]

  return (
    <WeatherCardBase
      opened={opened}
      alerts={alerts}
      headerParams={headerParams}
      bodyParams={bodyParams}
      renderDate={() => (
        <Typography textTransform="uppercase">{weather.dt.format('h A')}</Typography>
      )}
      renderImg={() => <img src={weather.icon.src} alt={weather.description} />}
      renderTemperature={() => (
        <Typography variant="h4" sx={{ lineHeight: 1 }}>
          {weather.temp}°
        </Typography>
      )}
      renderDescription={() => (
        <>
          <Typography>Feels like {weather.feels_like}°</Typography>
          <Typography color="text.secondary" fontSize={14}>
            {weather.description}
          </Typography>
        </>
      )}
    />
  )
}

export { HourWeatherCard }
