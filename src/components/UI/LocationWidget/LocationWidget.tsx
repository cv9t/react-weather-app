import React from 'react'
import { Tooltip, Typography, Skeleton } from '@mui/material'
import {
  Wrapper,
  StyledPaper,
  StyledSpan,
  StyledTypography,
  ImgWrapper,
} from './LocationWidget.styled'
import { CurrentWeatherType, LocationType, WeatherAlertType } from '../../../types'
import { AlertTooltip } from '../AlertTooltip'

interface LocationWidgetProps {
  location: LocationType
  weather: CurrentWeatherType | undefined
  onClick: (location: LocationType) => void
  alerts?: WeatherAlertType[]
  loading?: boolean
  variant?: 'text' | 'contained'
}

function LocationWidget({
  location,
  weather,
  onClick,
  alerts = [],
  loading,
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
        <Wrapper variant={variant} onClick={() => onClick(location)}>
          <StyledPaper elevation={variant === 'text' ? 0 : 3}>
            {alerts.length > 0 && (
              <AlertTooltip alerts={alerts}>
                <StyledSpan>{alerts.length}</StyledSpan>
              </AlertTooltip>
            )}
            {variant === 'text' ? (
              <StyledTypography>{location.description}</StyledTypography>
            ) : (
              <Typography>{location.description}</Typography>
            )}
            <Tooltip title={weather.description}>
              <ImgWrapper>
                <img src={weather.icon.src} alt={weather.description} />
              </ImgWrapper>
            </Tooltip>
            <Typography>{weather.temp}°C</Typography>
          </StyledPaper>
        </Wrapper>
      )}
    </>
  )
}

export { LocationWidget }
