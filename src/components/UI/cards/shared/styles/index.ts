import { IconButton, styled } from '@mui/material'

export const CardContainer = styled('div')(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: 86,
  marginTop: 12,
  padding: '0 20px',
  border: '1px solid  rgba(0, 0, 0, 0.12)',
  overflow: 'hidden',
}))

export const ImgWrapper = styled('div')`
  margin-right: 16px;
`

export const MainStatsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'space-around',

  '& svg': {
    marginRight: 8,
    color: theme.palette.primary.main,
  },
}))

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  transform: 'rotate(-180deg)',
  transition: theme.transitions.create(['transform']),
  '&.opened': {
    transform: 'rotate(0deg)',
  },
}))
