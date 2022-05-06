import React from 'react'
import { SnackbarProvider } from 'notistack'
import { StyledEngineProvider, ThemeProvider, GlobalStyles } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { theme } from '../styles'
import { RecentLocationsProvider } from '../context'
import { Layout } from './Layout'
import { Home, NotFound, LocationWeather } from '../pages'
import { LoadGoogleMap } from './LoadGoogleMap'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="location/:locationId" element={<LocationWeather />} />
          <Route path="*" element={<NotFound />} />
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
        padding: '0 calc(20px - (100vw - 100%)) 0 0',
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
            <LoadGoogleMap>
              <App />
            </LoadGoogleMap>
          </RecentLocationsProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export { AppWithProviders }
