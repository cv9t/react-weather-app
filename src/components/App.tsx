import React, { FC } from 'react';
import {
  Container,
  GlobalStyles,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
  Box,
} from '@mui/material';
import { theme } from '../theme';
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

const App: FC = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
    <Container maxWidth="md" sx={{ py: 1 }}>
      <SearchBar />
    </Container>
  </Box>
);

const AppWithMui = () => (
  <StyledEngineProvider injectFirst>
    <MUIThemeProvider theme={theme}>
      {inputGlobalStyles()}
      <App />
    </MUIThemeProvider>
  </StyledEngineProvider>
);

export { AppWithMui };
