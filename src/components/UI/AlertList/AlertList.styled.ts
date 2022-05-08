import { styled } from '@mui/material'
import { grey } from '@mui/material/colors'

export const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 16,
  padding: '10px 16px',
  border: `1px solid ${grey[300]}`,
  borderRadius: 4,

  '& .MuiTypography-root': {
    fontSize: 14,
  },

  '& .MuiDivider-root': {
    color: grey[300],
    margin: '10px 0 12px',
  },
}))

export const CaptionWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}))

export const AlertContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 8,

  '&:last-child': {
    marginBottom: 0,
  },
}))
