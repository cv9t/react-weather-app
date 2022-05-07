import { styled } from '@mui/material'

export const HourlyViewContainer = styled('div')`
  display: flex;
  flex-direction: column;
`

export const TimeInterval = styled('span')(({ theme }) => ({
  marginBottom: 12,
  fontWeight: 500,
  fontSize: 14,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
}))
