import React from 'react';
import { StyledEngineProvider, ThemeProvider, GlobalStyles } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { theme } from '../../styles';
import { Home, NotFound, SearchResults, LocationWeather } from '../../pages';
import { RecentLocationsProvider } from '../../context';
import { Layout } from '..';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="search-results/:query" element={<SearchResults />} />
        <Route path="location/:placeId" element={<LocationWeather />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
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
);

function AppWithProviders() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {inputGlobalStyles()}
          <BrowserRouter>
            <RecentLocationsProvider>
              <App />
            </RecentLocationsProvider>
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </SnackbarProvider>
  );
}

export { AppWithProviders };
