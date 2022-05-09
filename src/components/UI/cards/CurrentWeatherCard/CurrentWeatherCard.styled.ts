import { styled } from '@mui/material'
import { grey } from '@mui/material/colors'

export const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 12,
  padding: 16,
  border: `1px solid ${grey[300]}`,
  borderRadius: 4,
}))

export const StyledSpan = styled('span')(({ theme }) => ({
  marginBottom: 12,
  fontWeight: 500,
  fontSize: 14,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
}))

export const ImgWrapper = styled('div')(() => ({
  '& img': {
    width: 100,
    height: 100,
  },
}))
