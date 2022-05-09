import React from 'react'
import { Divider, Typography } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning'
import { WeatherAlertType } from '../../../types'
import { Container, CaptionWrapper, AlertContainer } from './AlertList.styled'

interface AlertListProps {
  alerts: WeatherAlertType[]
}

function AlertList({ alerts }: AlertListProps) {
  return alerts.length > 0 ? (
    <Container>
      <CaptionWrapper>
        <WarningIcon color="error" sx={{ marginRight: 1 }} />
        <Typography textTransform="uppercase">Alerts</Typography>
      </CaptionWrapper>
      <Divider />
      {alerts.map((alert, idx) => (
        <AlertContainer key={idx}>
          <Typography fontWeight={500} lineHeight={1}>
            {alert.event}
          </Typography>
          <Typography>
            {`${alert.start.format('h:mm A dddd')} - ${alert.end.format('h:mm A dddd')}`}
          </Typography>
        </AlertContainer>
      ))}
    </Container>
  ) : null
}

export { AlertList }
