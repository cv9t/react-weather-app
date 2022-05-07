import { styled, InputBase, List, ListItem } from '@mui/material'
import { grey } from '@mui/material/colors'

export const LocationSearchBarContainer = styled('div')(() => ({
  position: 'relative',
  width: '100%',
}))

export const Input = styled(InputBase)(({ theme }) => ({
  width: '100%',

  '& .MuiInputBase-input': {
    minWidth: 260,
    padding: '8px 12px',
    borderRadius: 4,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${grey[300]}`,
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),

    '&:focus': {
      boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)',
      borderColor: theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff',
    },
  },
}))

export const OptionList = styled(List)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  margin: '8px 0 0',
  padding: 0,
  borderRadius: 4,
  backgroundColor: theme.palette.background.paper,
  zIndex: 1000,
  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',

  '& .MuiListItem-root': {
    padding: '6px 16px',
  },
}))

export const Option = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${grey[300]}`,
  transition: theme.transitions.create(['background-color', 'color'], { duration: 50 }),

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: grey[300],
  },

  '&:last-child': {
    borderBottom: '1px solid transparent',
  },

  '&.Mui-focusVisible': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
}))
