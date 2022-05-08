import { List, ListItem, ListItemText, styled } from '@mui/material'

export const StyledList = styled(List)(() => ({
  padding: 0,
}))

export const StyledListItem = styled(ListItem)(() => ({
  minHeight: 32,
  paddingTop: 0,
  paddingBottom: 0,
}))

export const StyledListItemText = styled(ListItemText)(() => ({
  '& .MuiListItemText-primary': {
    fontSize: 14,
    fontWeight: 500,
    mb: 0.25,
    color: 'rgba(255,255,255,.8)',
  },
  '& .MuiListItemText-secondary': {
    color: 'rgba(255,255,255,.5)',
  },
}))
