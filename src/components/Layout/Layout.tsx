import React from 'react';
import { Box, Container } from '@mui/material';
import { useLocation, Outlet } from 'react-router-dom';
import { Header } from '../Header';

function Layout() {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <Box>
      {/* {!isHomePage ? <Header /> : null} */}

      <Container maxWidth="lg" sx={{ paddingTop: isHomePage ? 0 : 10 }}>
        <Outlet />
      </Container>
    </Box>
  );
}

export { Layout };
