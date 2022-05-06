// import { styled, Paper } from '@mui/material'

// interface LocationWidgetWrapperProps {
//   variant: 'text' | 'contained'
// }

// export const LocationWidgetWrapper = styled('div', {
//   shouldForwardProp: (prop) => prop !== 'variant',
// })<LocationWidgetWrapperProps>(({ theme, variant }) =>
//   variant === 'text'
//     ? {
//         '& .MuiPaper-root': {
//           color: '#000',
//           background: 'transparent',
//           padding: 0,
//           '&:hover': {
//             cursor: 'pointer',
//           },
//         },
//       }
//     : {
//         '& .MuiPaper-root': {
//           color: '#fff',
//           transition: theme.transitions.create(['background-color']),
//           background: theme.palette.primary.main,
//           '&:hover': {
//             backgroundColor: theme.palette.primary.dark,
//             cursor: 'pointer',
//           },
//         },
//       }
// )

// export const StyledPaper = styled(Paper)(() => ({
//   position: 'relative',
//   display: 'flex',
//   alignItems: 'center',
//   width: 'auto',
//   minWidth: 220,
//   height: 40,
//   padding: '0 16px',
// }))

// export const LocationAlert = styled('span')`
//   position: absolute;
//   top: 7px;
//   left: -12px;
//   font-size: 12px;
//   width: 22px;
//   height: 22px;
//   color: #fff;
//   line-height: 22px;
//   text-align: center;
//   background: #d10000;
//   border-radius: 50%;
// `

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

export const StyledPaper = styled(Paper)`
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

export const LocationAlert = styled('span')(({ theme }) => ({
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
