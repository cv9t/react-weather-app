import React from 'react'
import { Tooltip, Typography, Skeleton } from '@mui/material'
import { LocationWidgetWrapper, LocationAlertTitle, StyledPaper } from './LocationWidget.styled'
import { LocationType, WeatherType } from '../../../../types'
import { capitalizeString } from '../../../../utils'
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
          <StyledPaper elevation={variant === 'text' ? 0 : 3}>
            {!withoutAlerts && weather.alerts.length > 0 && (
              <WarningTooltip alerts={weather.alerts}>
                <LocationAlertTitle>{weather.alerts.length}</LocationAlertTitle>
              </WarningTooltip>
            )}
            <Typography component="span">{location.description}</Typography>
            <Tooltip title={capitalizeString(weather.current.description)}>
              <img
                src={weather.current.icon.src}
                height={50}
                width={50}
                alt={weather.current.description}
              />
            </Tooltip>
            <Typography component="span">{weather.current.temp}°C</Typography>
          </StyledPaper>
        </LocationWidgetWrapper>
      )}
    </>
  )
}

export { LocationWidget }
