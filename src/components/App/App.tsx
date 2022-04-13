import React from 'react';
import {
  GlobalStyles,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material';
import { theme } from '../../theme';

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

const App = () => <div>hello world</div>;

const AppWithMui = () => (
  <StyledEngineProvider injectFirst>
    <MUIThemeProvider theme={theme}>
      {inputGlobalStyles()}
      <App />
    </MUIThemeProvider>
  </StyledEngineProvider>
);

export { AppWithMui };
