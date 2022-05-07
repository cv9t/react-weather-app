import React from 'react'
import clsx from 'clsx'
import { Box, Divider, Grid, Tooltip, Typography } from '@mui/material'
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
  InformationWrapper,
} from './WeatherCard.styled'
import { WeatherAlertType } from '../../../../types'
import { AdditionalInformationType } from '../shared/types'

interface WeatherCardProps {
  renderDate: () => React.ReactNode
  renderImg: () => React.ReactNode
  renderTemperature: () => React.ReactNode
  renderDescription: () => React.ReactNode
  renderStats: () => React.ReactNode
  alerts: WeatherAlertType[]
  additionalInformation: AdditionalInformationType[]
  opened?: boolean
}

function WeatherCard({
  renderDate,
  renderImg,
  renderTemperature,
  renderDescription,
  renderStats,
  alerts,
  additionalInformation,
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
              <Divider color={grey[300]} sx={{ margin: '10px 0 12px' }} />
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
          <Typography fontWeight={500} mb={2}>
            Additional Information
          </Typography>
          <Grid container alignItems="center" spacing={2}>
            {additionalInformation.map((info) => (
              <Grid key={info.title} item md={4} sm={6} xs={12}>
                <InformationWrapper>
                  <Typography fontSize={14} fontWeight={500} color="text.secondary">
                    {info.title}
                  </Typography>
                  <Typography>{info.value}</Typography>
                </InformationWrapper>
              </Grid>
            ))}
          </Grid>
        </WeatherCardBody>
      )}
    </WeatherCardContainer>
  )
}

export { WeatherCard }
