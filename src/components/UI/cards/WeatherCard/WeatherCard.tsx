import React from 'react'
import clsx from 'clsx'
import moment from 'moment'
import { Box, Typography } from '@mui/material'
import AirIcon from '@mui/icons-material/Air'
import OpacityIcon from '@mui/icons-material/Opacity'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { DailyWeatherType } from '../../../../types'
import {
  WeatherCardContainer,
  DateWrapper,
  ImgWrapper,
  WeatherWrapper,
  MainStatsWrapper,
  StyledIconButton,
} from './WeatherCard.styled'
import { capitalizeString } from '../../../../utils'

interface WeatherCardProps {
  weather: DailyWeatherType
}

function WeatherCard({ weather }: WeatherCardProps) {
  const [open, setOpen] = React.useState(false)
  const date = moment(weather.dt, 'X')
  const mainStats = [
    {
      icon: <AirIcon />,
      title: `${Math.round(weather.wind_speed)} m/s`,
    },
    {
      icon: <OpacityIcon />,
      title: `${weather.humidity}%`,
    },
    {
      icon: <CloudQueueIcon />,
      title: `${weather.clouds}%`,
    },
  ]

  const handleOpen = () => {
    setOpen((prev) => !prev)
  }

  return (
    <WeatherCardContainer>
      <DateWrapper>
        <Typography textTransform="uppercase">{date.format('ddd')}</Typography>
        <Typography color="text.secondary">{date.format('M/D')}</Typography>
      </DateWrapper>
      <ImgWrapper>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].main}
        />
      </ImgWrapper>
      <WeatherWrapper>
        <Typography variant="h3" fontWeight="400" sx={{ lineHeight: 1 }}>
          {Math.round(weather.temp.day)}°
        </Typography>
        <Typography fontSize="20px" color="text.secondary" sx={{ marginTop: 'auto' }}>
          /{Math.round(weather.temp.night)}°
        </Typography>
      </WeatherWrapper>
      <Typography sx={{ width: 120 }}>
        {capitalizeString(weather.weather[0].description)}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <MainStatsWrapper>
        {mainStats.map((stat) => (
          <Box key={stat.title} sx={{ display: 'flex' }}>
            {stat.icon}
            <Typography>{stat.title}</Typography>
          </Box>
        ))}
      </MainStatsWrapper>
      <Box sx={{ flexGrow: 1 }} />
      <StyledIconButton className={clsx({ opened: open })} onClick={handleOpen}>
        <KeyboardArrowDownIcon />
      </StyledIconButton>
    </WeatherCardContainer>
  )
}

export { WeatherCard }
