import React from 'react'
import moment from 'moment'
import { List, ListItem, ListItemText, Tooltip, Typography, Skeleton } from '@mui/material'
import { LocationWidgetWrapper, LocationAlert, StyledPaper } from './LocationWidget.styled'
import { WeatherDataType, LocationType, WeatherAlertType } from '../../../../types'
import { capitalizeString } from '../../../../utils'

interface LocationWidgetProps {
  location: LocationType
  weather: WeatherDataType | undefined
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
  const getUniqueAlerts = (alerts: WeatherAlertType[]) => {
    const res: WeatherAlertType[] = []
    for (let i = 0; i < alerts.length; i += 1) {
      const alert = alerts[i]
      if (!res.find((a) => JSON.stringify(a.tags) === JSON.stringify(alert.tags))) {
        res.push(alert)
      }
    }
    return res
  }

  const renderLocationAlerts = (alerts: WeatherAlertType[]) => {
    const uniqueAlerts = getUniqueAlerts(alerts)

    return (
      <Tooltip
        placement="top"
        title={
          <List sx={{ padding: 0 }}>
            {uniqueAlerts.map((alert) => (
              <ListItem
                key={alert.event}
                sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
              >
                <ListItemText
                  primary={`Warning for ${alert.event}`}
                  primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium', mb: 0.25 }}
                  secondary={
                    <>
                      <span>Start: {moment(alert.start, 'X').format('ddd, MMMM DD, h:mm a')}</span>
                      <br />
                      <span>End: {moment(alert.end, 'X').format('ddd, MMMM DD, h:mm a')}</span>
                    </>
                  }
                  secondaryTypographyProps={{ color: 'rgba(255,255,255,.5)' }}
                />
              </ListItem>
            ))}
          </List>
        }
      >
        <LocationAlert>{uniqueAlerts.length}</LocationAlert>
      </Tooltip>
    )
  }

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
            {!withoutAlerts && weather.alerts && renderLocationAlerts(weather.alerts)}
            <Typography component="span">{location.description}</Typography>
            <Tooltip title={capitalizeString(weather.current.weather[0].description)}>
              <img
                src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
                height={50}
                width={50}
                alt={weather.current.weather[0].main}
              />
            </Tooltip>
            <Typography component="span">{Math.round(weather.current.temp)}°C</Typography>
          </StyledPaper>
        </LocationWidgetWrapper>
      )}
    </>
  )
}

export { LocationWidget }
