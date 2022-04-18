import React, { useState } from 'react';
import {
  Container,
  GlobalStyles,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
  Box,
} from '@mui/material';
import { theme } from '../styles/theme';
import { SearchBar } from './SearchBar';

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

const cities = [
  { country: 'United States', name: 'Atlanta' },
  { country: 'Russia', name: 'Irkutsk' },
  { country: 'Canada', name: 'Toronto' },
  { country: 'Japan', name: 'Tokyo' },
  { country: 'China', name: 'KongKok' },
  { country: 'Germany', name: 'Berlin' },
  { country: 'Germany', name: 'Aachen' },
];

// const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

function App() {
  const [value, setValue] = useState('');

  const handleSearch = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
      <Container maxWidth="md" sx={{ py: 1 }}>
        <SearchBar
          options={(cities as Array<{ country: string; name: string }>)
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))}
          onSearch={handleSearch}
          getOptionLabel={(option) => option.name}
          getDescriptionLabel={(option) => option.country}
          placeholder="Search city"
          maxOptions={10}
        />
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
