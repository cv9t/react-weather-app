import React from 'react'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, RecentLocationsProvider } from '../context'
import { LoadGoogleMap } from './LoadGoogleMap'
import { Layout } from './Layout'
import { Home, NotFound, LocationWeather } from '../pages'

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

function AppWithProviders() {
  return (
    <ThemeProvider>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <RecentLocationsProvider>
          <LoadGoogleMap>
            <App />
          </LoadGoogleMap>
        </RecentLocationsProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export { AppWithProviders }
