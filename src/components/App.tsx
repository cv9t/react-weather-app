import React, { useEffect, useState } from 'react';
import {
  Container,
  GlobalStyles,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
  Box,
} from '@mui/material';
import { theme } from '../styles/theme';
import { useFetching } from '../hooks';
import { CityType } from '../types';
import { SearchBar } from './SearchBar';
import { CityService } from '../services';

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

// const cities = [
//   { country: 'United States', name: 'Atlanta' },
//   { country: 'Russia', name: 'Irkutsk' },
//   { country: 'Canada', name: 'Toronto' },
//   { country: 'Japan', name: 'Tokyo' },
//   { country: 'China', name: 'KongKok' },
//   { country: 'Germany', name: 'Berlin' },
//   { country: 'Germany', name: 'Aachen' },
// ];

// function convert(arr: any[]) {
//   const res = [];

// for (let i = 0; i < arr.length; i += 1) {
//   const country = arr[i].name;
//   for (let j = 0; j < arr[i].states.length; j += 1) {
//     const { name } = arr[i].states[j];
//     res.push({ country, name });
//   }
// }

// return res;
// }

function App() {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<CityType[]>([]);
  const [fetching, isLoading] = useFetching(async () => {
    const fetchedOptions = await CityService.fetchCities();
    setOptions(fetchedOptions);
  });

  const handleSearch = (newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetching();
  }, []);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
      <Container maxWidth="md" sx={{ py: 1 }}>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <SearchBar
            options={options.slice().sort((a, b) => a.name.localeCompare(b.name))}
            onSearch={handleSearch}
            getOptionLabel={(option) => option.name}
            getDescriptionLabel={(option) => option.country}
            placeholder="Search city"
            maxOptions={10}
          />
        )}

        <h1>{value}</h1>
      </Container>
    </Box>
  );
}

function AppWithMui() {
  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        {inputGlobalStyles()}
        <App />
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}

export { AppWithMui };
