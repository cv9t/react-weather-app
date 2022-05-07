import { styled } from '@mui/material'

export const DailyViewContainer = styled('div')`
  display: flex;
  flex-direction: column;
`

export const DateInterval = styled('span')(({ theme }) => ({
  marginBottom: 12,
  fontWeight: 500,
  fontSize: 14,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
}))
