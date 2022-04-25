import { styled, InputBase, autocompleteClasses } from '@mui/material';

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

export const StyledAutocompletePopper = styled('div')(() => ({
  position: 'relative',

  [`& .${autocompleteClasses.paper}`]: {
    position: 'absolute',
    width: '100%',
    zIndex: 1000,
    marginTop: 8,
    backgroundColor: '#fff',
  },
  [`& .${autocompleteClasses.listbox}`]: {
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      padding: '12px 16px',
      borderBottom: '1px solid #d9d9d9',
      '&:last-child': {
        borderBottom: '1px solid transparent',
      },
      '&.Mui-focusVisible': {
        backgroundColor: '#f5f5f5',
      },
    },
  },
}));
