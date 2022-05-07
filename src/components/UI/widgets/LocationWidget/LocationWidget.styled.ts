import { styled, Paper } from '@mui/material'

interface LocationWidgetWrapperProps {
  variant: 'text' | 'contained'
}

export const LocationWidgetWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'variant',
})<LocationWidgetWrapperProps>(({ theme, variant }) =>
  variant === 'text'
    ? {
        '& .MuiPaper-root': {
          color: theme.palette.text.primary,
          background: 'transparent',
          padding: 0,
        },
      }
    : {
        '& .MuiPaper-root': {
          color: theme.palette.primary.contrastText,
          transition: theme.transitions.create(['background-color']),
          background: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            cursor: 'pointer',
          },
        },
      }
)

export const Inner = styled(Paper)`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 220px;
  width: auto;
  height: 40px;
  padding: 0 16px;
  overflow: 'hidden';

  &:hover {
    cursor: pointer;
  }
`

export const Text = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: '7px',
  left: '-12px',
  fontSize: 12,
  width: '22px',
  height: '22px',
  lineHeight: '22px',
  textAlign: 'center',
  backgroundColor: theme.palette.error.main,
  borderRadius: '50%',
}))
