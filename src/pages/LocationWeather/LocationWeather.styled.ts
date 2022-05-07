import { styled, Tab } from '@mui/material'

export const LocationWeatherContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

export const WeatherViewTab = styled(Tab)(() => ({
  minWidth: 'auto',
  marginRight: 20,
  padding: 0,
  letterSpacing: 1,
  '&:last-child': {
    marginRight: 0,
  },
}))

export const LoaderWrapper = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}))
