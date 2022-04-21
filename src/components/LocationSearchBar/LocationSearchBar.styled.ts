import { InputBase, styled, List, ListItem } from '@mui/material';

export const LocationSearchBarWrapper = styled('div')(() => ({
  position: 'relative',
}));

export const StyledInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '8px 12px',
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fff',
    border: '1px solid #d9d9d9',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    '&:focus': {
      boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)',
      borderColor: theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff',
    },
  },
}));

export const StyledList = styled(List)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  margin: '8px 0 0',
  padding: 0,
  borderRadius: 4,
  backgroundColor: theme.palette.mode === 'dark' ? '#141414' : '#fff',
  zIndex: 1000,
  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: '1px solid #d9d9d9',
  transition: theme.transitions.create(['color'], { duration: 100 }),
  '&:last-child': {
    borderBottom: '1px solid transparent',
  },
  '&.Mui-focused': {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'transparent',
  },
}));
