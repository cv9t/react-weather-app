import React from 'react'
import { Box, Tooltip, Typography } from '@mui/material'
import AirIcon from '@mui/icons-material/Air'
import OpacityIcon from '@mui/icons-material/Opacity'
import { DailyWeatherType, WeatherAlertType } from '../../../../types'
import { WeatherCard } from '../WeatherCard'
import { AdditionalInformationType } from '../shared/types'

interface WeatherDayCardProps {
  weather: DailyWeatherType
  alerts: WeatherAlertType[]
  opened?: boolean
}

function WeatherDayCard({ weather, alerts, opened }: WeatherDayCardProps) {
  const weatherHeaderStats = [
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
  const additionalInformation: AdditionalInformationType[] = [
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
      value: `${weather.wind_deg}°`,
    },
  ]

  return (
    <WeatherCard
      opened={opened}
      alerts={alerts}
      additionalInformation={additionalInformation}
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
      renderStats={() =>
        weatherHeaderStats.map((stat) => (
          <Tooltip key={stat.title} placement="top" title={stat.title}>
            <Box sx={{ display: 'flex', '&:hover': { cursor: 'pointer' } }}>
              {stat.icon}
              <Typography>{stat.text}</Typography>
            </Box>
          </Tooltip>
        ))
      }
    />
  )
}

export { WeatherDayCard }
