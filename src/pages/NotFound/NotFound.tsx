import React from 'react'
import { Typography } from '@mui/material'

function NotFound() {
  return (
    <div>
      <Typography variant="h5" align="center" mb={1}>
        We can&apos;t find the page you are looking for. 😔
      </Typography>
      <Typography color="text.secondary" align="center">
        Try to reload the page.
      </Typography>
    </div>
  )
}

export { NotFound }
