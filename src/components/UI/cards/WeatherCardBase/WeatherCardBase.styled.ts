import { styled, IconButton } from '@mui/material'
import { grey } from '@mui/material/colors'

export const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 12,
  border: `1px solid ${grey[300]}`,
  borderRadius: 4,

  '&:last-child': {
    marginBottom: 0,
  },
}))

export const Header = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  flexGrow: 1,
  flexBasis: 0,
}))

export const Body = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 16px 16px',
}))

export const DateWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: 46,
  marginRight: 24,

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

export const HeaderParamsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexGrow: 1,
  flexBasis: 0,
  marginRight: 16,

  '& div': {
    flexGrow: 1,
    flexBasis: 0,
  },

  '& svg': {
    color: theme.palette.primary.main,
  },
}))

export const OpenButtonWrapper = styled('div')(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
}))

export const OpenButton = styled(IconButton)(() => ({
  transform: 'rotate(-180deg)',

  '&.opened': {
    transform: 'rotate(0deg)',
  },
}))

export const HeaderParam = styled('div')(() => ({
  display: 'inline-flex',
  padding: '5px',
  '&:hover': { cursor: 'pointer' },
}))

export const BodyParam = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: 8,
  borderBottom: `1px solid ${grey[300]}`,
}))
