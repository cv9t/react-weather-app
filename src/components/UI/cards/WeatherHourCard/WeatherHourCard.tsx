import React from 'react'
import { Box, Tooltip, Typography } from '@mui/material'
import AirIcon from '@mui/icons-material/Air'
import OpacityIcon from '@mui/icons-material/Opacity'
import { HourlyWeatherType, WeatherAlertType } from '../../../../types'
import { WeatherCard } from '../WeatherCard'
import { AdditionalInformationType } from '../shared/types'

interface WeatherHourCardProps {
  weather: HourlyWeatherType
  alerts: WeatherAlertType[]
  opened?: boolean
}

function WeatherHourCard({ weather, alerts, opened }: WeatherHourCardProps) {
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
    <WeatherCard
      opened={opened}
      alerts={alerts}
      additionalInformation={additionalInformation}
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

export { WeatherHourCard }
