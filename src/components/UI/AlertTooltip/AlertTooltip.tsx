import React from 'react'
import { Tooltip } from '@mui/material'
import { WeatherAlertType } from '../../../types'
import { StyledList, StyledListItem, StyledListItemText } from './AlertTooltip.styled'

interface AlertTooltipProps {
  alerts: WeatherAlertType[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: React.ReactElement<any, any>
}

function AlertTooltip({ alerts, children }: AlertTooltipProps) {
  return (
    <Tooltip
      placement="top"
      title={
        <StyledList>
          {alerts.map((alert) => (
            <StyledListItem key={alert.event}>
              <StyledListItemText
                primary={`Warning for ${alert.event}`}
                secondary={
                  <>
                    <span>Start: {alert.start.format('ddd, MMMM D, h:mm a')}</span>
                    <br />
                    <span>End: {alert.end.format('ddd, MMMM D, h:mm a')}</span>
                  </>
                }
              />
            </StyledListItem>
          ))}
        </StyledList>
      }
    >
      {children}
    </Tooltip>
  )
}

export { AlertTooltip }
