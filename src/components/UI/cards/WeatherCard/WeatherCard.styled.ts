import { styled, IconButton } from '@mui/material'
import { grey } from '@mui/material/colors'

export const WeatherCardContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 12,
  border: `1px solid ${grey[300]}`,
  borderRadius: 4,
}))

export const WeatherCardHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  flexGrow: 1,
  flexBasis: 0,
}))

export const WeatherCardBody = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 16px 16px',
}))

export const DateWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginRight: 32,

  '& .MuiTypography-root': {
    fontWeight: 500,
    fontSize: 14,
  },
}))

export const ImgWrapper = styled('div')(() => ({
  marginRight: 8,

  '& img': {
    width: 84,
    height: 84,
  },
}))

export const TemperatureWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  flexBasis: 0,
}))

export const DescriptionWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  flexBasis: 0,
}))

export const StatsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexGrow: 1,
  flexBasis: 0,
  marginRight: 64,

  '& svg': {
    color: theme.palette.primary.main,
  },
}))

export const OpenButton = styled(IconButton)(() => ({
  transform: 'rotate(-180deg)',

  '&.opened': {
    transform: 'rotate(0deg)',
  },
}))

export const AlertsContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 22,
  padding: '10px 16px',
  border: `1px solid ${grey[300]}`,
  borderRadius: 4,

  '& .MuiTypography-root': {
    fontSize: 14,
  },
}))

export const AlertWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 16,

  '&:last-child': {
    marginBottom: 0,
  },
}))

export const InformationWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: 8,
  borderBottom: `1px solid ${grey[300]}`,
}))
