import { AppBar, styled, Typography } from '@mui/material'

export const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: '#fff',
  color: '#000',
  alignItems: 'center',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  '& .MuiToolbar-root': {
    padding: 0,
  },
}))

export const StyledTypography = styled(Typography)`
  margin-right: 40px;
  cursor: pointer;

  a,
  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
    color: inherit;
  }
`
