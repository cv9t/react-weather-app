import React from 'react'
import clsx from 'clsx'
import { Box, Divider, Tooltip, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import WarningIcon from '@mui/icons-material/Warning'
import { grey } from '@mui/material/colors'
import {
  DescriptionWrapper,
  TemperatureWrapper,
  ImgWrapper,
  DateWrapper,
  WeatherCardContainer,
  WeatherCardHeader,
  StatsWrapper,
  OpenButton,
  WeatherCardBody,
  AlertsContainer,
  AlertWrapper,
} from './WeatherCard.styled'
import { WeatherAlertType } from '../../../../types'

interface WeatherCardProps {
  renderDate: () => React.ReactNode
  renderImg: () => React.ReactNode
  renderTemperature: () => React.ReactNode
  renderDescription: () => React.ReactNode
  renderStats: () => React.ReactNode
  alerts: WeatherAlertType[]
  opened?: boolean
}

function WeatherCard({
  renderDate,
  renderImg,
  renderTemperature,
  renderDescription,
  renderStats,
  alerts,
  opened,
}: WeatherCardProps) {
  const [open, setOpen] = React.useState(opened)

  const handleOpen = () => {
    setOpen((prev) => !prev)
  }

  return (
    <WeatherCardContainer>
      <WeatherCardHeader>
        <DateWrapper>{renderDate()}</DateWrapper>
        <ImgWrapper>{renderImg()}</ImgWrapper>
        <TemperatureWrapper>{renderTemperature()}</TemperatureWrapper>
        <DescriptionWrapper>{renderDescription()}</DescriptionWrapper>
        <StatsWrapper>{renderStats()}</StatsWrapper>
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {alerts.length > 0 && (
            <Tooltip placement="top" title={`${alerts.length} alerts`}>
              <WarningIcon color="error" sx={{ position: 'absolute', right: 48 }} />
            </Tooltip>
          )}
          <OpenButton className={clsx({ opened: open })} onClick={handleOpen}>
            <KeyboardArrowDownIcon />
          </OpenButton>
        </Box>
      </WeatherCardHeader>
      {open && (
        <WeatherCardBody>
          {alerts.length > 0 && (
            <AlertsContainer>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WarningIcon color="error" sx={{ marginRight: 1 }} />
                <Typography textTransform="uppercase">Alerts</Typography>
              </Box>
              <Divider color={grey[300]} sx={{ margin: '12px 0 ' }} />
              {alerts.map((alert, idx) => (
                <AlertWrapper key={idx}>
                  <Typography fontWeight={500} lineHeight={1}>
                    {alert.event}
                  </Typography>
                  <Typography>
                    {`${alert.start.format('h:mm A dddd')} - ${alert.end.format('h:mm A dddd')}`}
                  </Typography>
                </AlertWrapper>
              ))}
            </AlertsContainer>
          )}
        </WeatherCardBody>
      )}
    </WeatherCardContainer>
  )
}

export { WeatherCard }
