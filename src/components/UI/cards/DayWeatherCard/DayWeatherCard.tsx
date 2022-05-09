import React from 'react'
import { Typography } from '@mui/material'
import AirIcon from '@mui/icons-material/Air'
import OpacityIcon from '@mui/icons-material/Opacity'
import { DailyWeatherType, WeatherAlertType } from '../../../../types'
import { WeatherCardBase } from '../WeatherCardBase'
import { WeatherCardHeaderParam, WeatherCardBodyParam } from '../shared/types'

interface DayWeatherCardProps {
  weather: DailyWeatherType
  alerts: WeatherAlertType[]
  opened?: boolean
}

function DayWeatherCard({ weather, alerts, opened }: DayWeatherCardProps) {
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
      title: 'Feels like (Morn)',
      value: `${weather.feels_like.morn}°`,
    },
    {
      title: 'Feels like (Day)',
      value: `${weather.feels_like.day}°`,
    },
    {
      title: 'Feels like (Night)',
      value: `${weather.feels_like.night}°`,
    },
    {
      title: 'Max temperature',
      value: `${weather.temp.max}°`,
    },
    {
      title: 'Min temperature',
      value: `${weather.temp.min}°`,
    },
    {
      title: 'Morning temperature',
      value: `${weather.temp.morn}°`,
    },
    {
      title: 'Wind Gust',
      value: `${weather.wind_gust} m/s`,
    },
    {
      title: 'Wind Direction (Deg)',
      value: `${weather.wind_deg}`,
    },
  ]

  return (
    <WeatherCardBase
      opened={opened}
      alerts={alerts}
      headerParams={headerParams}
      bodyParams={bodyParams}
      renderDate={() => (
        <>
          <Typography textTransform="uppercase">{weather.dt.format('ddd')}</Typography>
          <Typography color="text.secondary">{weather.dt.format('M/D')}</Typography>
        </>
      )}
      renderImg={() => <img src={weather.icon.src} alt={weather.description} />}
      renderTemperature={() => (
        <>
          <Typography variant="h4" sx={{ lineHeight: 1 }}>
            {weather.temp.day}°
          </Typography>
          <Typography color="text.secondary" sx={{ marginTop: 'auto' }}>
            /{weather.temp.night}°
          </Typography>
        </>
      )}
      renderDescription={() => <Typography>{weather.description}</Typography>}
    />
  )
}

export { DayWeatherCard }
