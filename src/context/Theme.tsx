import React from 'react'
import {
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
  GlobalStyles,
} from '@mui/material'
import { theme } from '../styles'

interface ThemeProviderProps {
  children: React.ReactNode
}

const inputGlobalStyles = () => (
  <GlobalStyles
    styles={{
      '*, *::after, *::before': {
        boxSizing: 'border-box',
      },
      body: {
        fontFamily: 'Roboto',
        margin: 0,
        padding: '0 calc(20px - (100vw - 100%)) 0 0',
      },
    }}
  />
)

function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        {inputGlobalStyles()}
        {children}
      </MuiThemeProvider>
    </StyledEngineProvider>
  )
}

export { ThemeProvider }
