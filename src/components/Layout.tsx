import React from 'react'
import { Container } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'

function Layout() {
  const location = useLocation()
  const homePage = location.pathname === '/'

  return (
    <>
      {!homePage ? <Header /> : null}

      <Container component="main" maxWidth="md" sx={{ paddingTop: homePage ? 0 : 10 }}>
        <Outlet />
      </Container>
    </>
  )
}

export { Layout }
