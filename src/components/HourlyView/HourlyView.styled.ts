import { styled } from '@mui/material'

export const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: 12,
}))

export const StyledSpan = styled('span')(({ theme }) => ({
  marginBottom: 12,
  fontWeight: 500,
  fontSize: 14,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
}))
