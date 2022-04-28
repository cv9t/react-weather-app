import React from 'react'
import { Container } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../Header'

function Layout() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <>
      {!isHomePage ? <Header /> : null}

      <Container maxWidth="lg" sx={{ paddingTop: isHomePage ? 0 : 10 }}>
        <Outlet />
      </Container>
    </>
  )
}

export { Layout }
