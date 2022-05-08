import { styled, Paper, Typography } from '@mui/material'

interface WrapperProps {
  variant: 'text' | 'contained'
}

export const Wrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'variant',
})<WrapperProps>(({ theme, variant }) =>
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

export const StyledPaper = styled(Paper)(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  minWidth: 220,
  width: 'auto',
  height: 40,
  padding: '0 16px',

  '&:hover': {
    cursor: 'pointer',
  },
}))

export const StyledSpan = styled('span')(({ theme }) => ({
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

export const StyledTypography = styled(Typography)(() => ({
  maxWidth: 200,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
}))

export const ImgWrapper = styled('div')(() => ({
  '& img': {
    width: 50,
    height: 50,
  },
}))
