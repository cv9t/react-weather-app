import { styled, ListItem } from '@mui/material';

export const LoaderWrapper = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: '16px 0',
  borderBottom: '1px solid #d9d9d9',
  '&:first-of-type': {
    borderTop: '1px solid #d9d9d9',
  },
  '&:hover': {
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
}));
