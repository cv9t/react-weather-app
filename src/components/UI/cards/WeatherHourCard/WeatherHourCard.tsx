import React from 'react'
import { Typography, Box } from '@mui/material'
import clsx from 'clsx'
import AirIcon from '@mui/icons-material/Air'
import OpacityIcon from '@mui/icons-material/Opacity'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import WarningIcon from '@mui/icons-material/Warning'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { HourlyWeatherType, WeatherAlertType } from '../../../../types'
import { TimeWrapper } from './WeatherHourCard.styled'
import { CardContainer, ImgWrapper, MainStatsWrapper, StyledIconButton } from '../shared/styles'
import { WarningTooltip } from '../../tooltips'

interface WeatherHourCardProps {
  weather: HourlyWeatherType
  alerts: WeatherAlertType[]
}

function WeatherHourCard({ weather, alerts }: WeatherHourCardProps) {
  const [open, setOpen] = React.useState(false)
  const currentAlerts = alerts.filter((alert) =>
    weather.dt.isBetween(alert.start, alert.end, 'hour', '[]')
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
      <TimeWrapper>
        <Typography>{weather.dt.format('hA')}</Typography>
      </TimeWrapper>
      <ImgWrapper>
        <img src={weather.icon.src} alt={weather.description} />
      </ImgWrapper>
      <Typography variant="h4" fontWeight="400" mr={8} sx={{ lineHeight: 1, width: 96 }}>
        {weather.temp}°
      </Typography>
      <Typography sx={{ width: 120 }}>Feels like {weather.feels_like}°</Typography>
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

export { WeatherHourCard }
