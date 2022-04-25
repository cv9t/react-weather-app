import { Typography } from '@mui/material';
import React from 'react';

function NotFound() {
  return (
    <>
      <Typography variant="h5" align="center">
        We can&apos;t find the page you are looking for. 😔{' '}
      </Typography>
      <Typography mt={1} align="center" color="text.secondary">
        Try to reload the page
      </Typography>
    </>
  );
}

export { NotFound };
