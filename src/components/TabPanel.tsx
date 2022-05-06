import React from 'react'
import { Box } from '@mui/material'

interface TabPanelProps {
  value: number
  index: number
  children: React.ReactNode
}

function TabPanel({ value, index, children }: TabPanelProps) {
  return <>{value === index && <Box sx={{ paddingTop: 2 }}>{children}</Box>}</>
}

export { TabPanel }
