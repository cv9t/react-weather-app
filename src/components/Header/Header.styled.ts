import { AppBar, styled } from '@mui/material';

export const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: '#fff',
  color: '#000',
  alignItems: 'center',
  '& .MuiToolbar-root': {
    padding: 0,
  },
}));
