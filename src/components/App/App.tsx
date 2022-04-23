import React from 'react';
import { StyledEngineProvider, ThemeProvider, GlobalStyles } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { theme } from '../../styles';
import { Home } from '../../pages';

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
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {inputGlobalStyles()}

        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export { App };
