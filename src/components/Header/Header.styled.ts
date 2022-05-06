import { AppBar, styled, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  padding: '0 calc(20px - (100vw - 100%)) 0 0',
  backgroundColor: theme.palette.primary.contrastText,
  color: theme.palette.text.primary,
  alignItems: 'center',
  boxShadow: 'none',
  borderBottom: `1px solid ${grey[300]}`,
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
