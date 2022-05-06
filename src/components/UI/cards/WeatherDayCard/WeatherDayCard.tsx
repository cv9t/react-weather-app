import React from 'react'
import clsx from 'clsx'
import { Box, Typography } from '@mui/material'
import AirIcon from '@mui/icons-material/Air'
import OpacityIcon from '@mui/icons-material/Opacity'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import WarningIcon from '@mui/icons-material/Warning'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { DailyWeatherType, WeatherAlertType } from '../../../../types'
import { DateWrapper, WeatherWrapper } from './WeatherDayCard.styled'
import { WarningTooltip } from '../../tooltips'
import { CardContainer, ImgWrapper, StyledIconButton, MainStatsWrapper } from '../shared/styles'

interface WeatherDayCardProps {
  weather: DailyWeatherType
  alerts: WeatherAlertType[]
}

function WeatherDayCard({ weather, alerts }: WeatherDayCardProps) {
  const [open, setOpen] = React.useState(false)
  const currentAlerts = alerts.filter((alert) =>
    weather.dt.isBetween(alert.start, alert.end, 'date', '[]')
  )
  const mainStats = [
    {
      id: 'wind',
      icon: <AirIcon />,
      title: `${weather.wind_speed} m/s`,
    },
    {
      id: 'pop',
      icon: <OpacityIcon />,
      title: `${weather.pop}%`,
    },
    {
      id: 'clouds',
      icon: <CloudQueueIcon />,
      title: `${weather.clouds}%`,
    },
  ]

  const handleOpen = () => {
    setOpen((prev) => !prev)
  }

  return (
    <CardContainer>
      <DateWrapper>
        <Typography textTransform="uppercase">{weather.dt.format('ddd')}</Typography>
        <Typography color="text.secondary">{weather.dt.format('M/D')}</Typography>
      </DateWrapper>
      <ImgWrapper>
        <img src={weather.icon.src} alt={weather.description} />
      </ImgWrapper>
      <WeatherWrapper>
        <Typography variant="h4" fontWeight="400" sx={{ lineHeight: 1 }}>
          {weather.temp.day}°
        </Typography>
        <Typography color="text.secondary" sx={{ marginTop: 'auto' }}>
          /{weather.temp.night}°
        </Typography>
      </WeatherWrapper>
      <Typography sx={{ width: 120 }}>{weather.description}</Typography>
      <Box sx={{ flexGrow: 1 }} />
      <MainStatsWrapper>
        {mainStats.map((stat) => (
          <Box key={stat.id} sx={{ display: 'flex' }}>
            {stat.icon}
            <Typography>{stat.title}</Typography>
          </Box>
        ))}
      </MainStatsWrapper>
      <Box sx={{ flexGrow: 1 }} />
      {currentAlerts.length > 0 && (
        <WarningTooltip alerts={currentAlerts}>
          <WarningIcon
            color="error"
            sx={{
              position: 'absolute',
              right: 64,
              '&:hover': { cursor: 'pointer' },
            }}
          />
        </WarningTooltip>
      )}
      <StyledIconButton className={clsx({ opened: open })} onClick={handleOpen}>
        <KeyboardArrowDownIcon />
      </StyledIconButton>
    </CardContainer>
  )
}

export { WeatherDayCard }
