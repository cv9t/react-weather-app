import React from 'react'
import { SnackbarProvider } from 'notistack'
import { StyledEngineProvider, ThemeProvider, GlobalStyles } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { theme } from '../styles'
import { Layout } from './Layout'
import { Home, LocationWeather, NotFound } from '../pages'
import { RecentLocationsProvider } from '../context'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="location/:locationId" element={<LocationWeather />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
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
        padding: 0,
      },
    }}
  />
)

function AppWithProviders() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <RecentLocationsProvider>
            {inputGlobalStyles()}
            <App />
          </RecentLocationsProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export { AppWithProviders }
