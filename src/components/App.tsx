import React, { useState } from 'react';
import { Container, GlobalStyles, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { theme } from '../styles';
import { LocationSearchBar } from './LocationSearchBar/LocationSearchBar';
import { LocationType } from '../types';
import { geocodeByAddress, getLatLng } from '../utils';

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

function App() {
  const [currentCity, setCurrentCity] = useState<LocationType | null>(null);
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [isError, setIsError] = useState(false);

  const handleSearch = async (value: LocationType) => {
    try {
      const results = await geocodeByAddress(value.description);
      const latLng = await getLatLng(results[0]);

      setCurrentCity(value);
      setCoords(latLng);
      setIsError(false);
    } catch (e) {
      setIsError(true);
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {inputGlobalStyles()}
        <Container maxWidth="md" sx={{ py: 1 }}>
          <LocationSearchBar
            value={currentCity}
            onSearch={handleSearch}
            placeholder="Search City"
          />
          {isError ? (
            <h1>Error</h1>
          ) : (
            <h1>
              lat: {coords.lat} lng: {coords.lng}
            </h1>
          )}
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export { App };
