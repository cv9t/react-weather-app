import React from 'react'
import { Tooltip, Typography, Skeleton } from '@mui/material'
import { LocationWidgetWrapper, Text, Inner } from './LocationWidget.styled'
import { LocationType, WeatherType } from '../../../../types'
import { WarningTooltip } from '../../tooltips'

interface LocationWidgetProps {
  location: LocationType
  weather: WeatherType | undefined
  onClick: (location: LocationType) => void
  loading?: boolean
  withoutAlerts?: boolean
  variant?: 'text' | 'contained'
}

function LocationWidget({
  location,
  weather,
  onClick,
  loading,
  withoutAlerts,
  variant = 'text',
}: LocationWidgetProps) {
  if (loading) {
    return (
      <Skeleton
        variant={variant === 'text' ? 'text' : 'rectangular'}
        animation="wave"
        width={220}
        height={40}
        sx={{ borderRadius: '4px' }}
      />
    )
  }

  return (
    <>
      {weather && (
        <LocationWidgetWrapper variant={variant} onClick={() => onClick(location)}>
          <Inner elevation={variant === 'text' ? 0 : 3}>
            {!withoutAlerts && weather.alerts.length > 0 && (
              <WarningTooltip alerts={weather.alerts}>
                <Text>{weather.alerts.length}</Text>
              </WarningTooltip>
            )}
            <Typography component="span">{location.description}</Typography>
            <Tooltip title={weather.current.description}>
              <img
                src={weather.current.icon.src}
                height={50}
                width={50}
                alt={weather.current.description}
              />
            </Tooltip>
            <Typography component="span">{weather.current.temp}°C</Typography>
          </Inner>
        </LocationWidgetWrapper>
      )}
    </>
  )
}

export { LocationWidget }
