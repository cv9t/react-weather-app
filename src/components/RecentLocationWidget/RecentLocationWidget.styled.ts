import { Paper, styled} from '@mui/material';

export const RecentLocationWidgetWrapper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: 'auto',
  minWidth: 220,
  height: 40,
  padding: '0 16px',
  color: '#000',
  transition: theme.transitions.create(['background-color']),
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
  },
}));

export const LocationAlert = styled('span')`
  position: absolute;
  top: 7px;
  left: -12px;
  font-size: 12px;
  width: 22px;
  height: 22px;
  color: #fff;
  line-height: 22px;
  text-align: center;
  background: #d10000;
  border-radius: 50%;
`;