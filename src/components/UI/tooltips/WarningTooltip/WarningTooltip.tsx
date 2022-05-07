import React from 'react'
import { Tooltip, List, ListItem, ListItemText } from '@mui/material'
import { WeatherAlertType } from '../../../../types'

interface WarningTooltipProps {
  alerts: WeatherAlertType[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: React.ReactElement<any, any>
}

function WarningTooltip({ alerts, children }: WarningTooltipProps) {
  return (
    <Tooltip
      placement="top"
      title={
        <List sx={{ padding: 0 }}>
          {alerts.map((alert) => (
            <ListItem
              key={alert.event}
              sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
            >
              <ListItemText
                primary={`Warning for ${alert.event}`}
                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium', mb: 0.25 }}
                secondary={
                  <>
                    <span>Start: {alert.start.format('ddd, MMMM D, h:mm a')}</span>
                    <br />
                    <span>End: {alert.end.format('ddd, MMMM D, h:mm a')}</span>
                  </>
                }
                secondaryTypographyProps={{ color: 'rgba(255,255,255,.5)' }}
              />
            </ListItem>
          ))}
        </List>
      }
    >
      {children}
    </Tooltip>
  )
}

export { WarningTooltip }
