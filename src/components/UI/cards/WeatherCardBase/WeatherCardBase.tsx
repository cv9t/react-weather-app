import React from 'react'
import clsx from 'clsx'
import { Grid, Tooltip, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import WarningIcon from '@mui/icons-material/Warning'
import {
  DescriptionWrapper,
  TemperatureWrapper,
  ImgWrapper,
  DateWrapper,
  Container,
  Header,
  OpenButtonWrapper,
  OpenButton,
  Body,
  BodyParam,
  HeaderParam,
  HeaderParamsContainer,
} from './WeatherCardBase.styled'
import { WeatherAlertType } from '../../../../types'
import { WeatherCardHeaderParam, WeatherCardBodyParam } from '../shared'
import { AlertList } from '../../AlertList'

interface WeatherCardBaseProps {
  alerts: WeatherAlertType[]
  headerParams: WeatherCardHeaderParam[]
  bodyParams: WeatherCardBodyParam[]
  renderDate: () => React.ReactNode
  renderImg: () => React.ReactNode
  renderTemperature: () => React.ReactNode
  renderDescription: () => React.ReactNode
  opened?: boolean
}

function WeatherCardBase({
  alerts,
  headerParams,
  bodyParams,
  renderDate,
  renderImg,
  renderTemperature,
  renderDescription,
  opened,
}: WeatherCardBaseProps) {
  const [open, setOpen] = React.useState(opened)

  const handleOpen = () => {
    setOpen((prev) => !prev)
  }

  return (
    <Container>
      <Header>
        <DateWrapper>{renderDate()}</DateWrapper>
        <ImgWrapper>{renderImg()}</ImgWrapper>
        <TemperatureWrapper>{renderTemperature()}</TemperatureWrapper>
        <DescriptionWrapper>{renderDescription()}</DescriptionWrapper>
        <HeaderParamsContainer>
          {headerParams.map((param) => (
            <div key={param.title}>
              <Tooltip placement="top" title={param.title}>
                <HeaderParam>
                  {param.icon}
                  <Typography>{param.text}</Typography>
                </HeaderParam>
              </Tooltip>
            </div>
          ))}
        </HeaderParamsContainer>
        <OpenButtonWrapper>
          {alerts.length > 0 && (
            <Tooltip placement="top" title={`${alerts.length} alerts`}>
              <WarningIcon color="error" sx={{ position: 'absolute', right: 48 }} />
            </Tooltip>
          )}
          <OpenButton className={clsx({ opened: open })} onClick={handleOpen}>
            <KeyboardArrowDownIcon />
          </OpenButton>
        </OpenButtonWrapper>
      </Header>
      {open && (
        <Body>
          <AlertList alerts={alerts} />
          <Typography fontWeight={500} mb={2}>
            Additional Information
          </Typography>
          <Grid container alignItems="center" spacing={2}>
            {bodyParams.map((param) => (
              <Grid key={param.title} item md={4} sm={6} xs={12}>
                <BodyParam>
                  <Typography fontSize={14} fontWeight={500} color="text.secondary">
                    {param.title}
                  </Typography>
                  <Typography>{param.value}</Typography>
                </BodyParam>
              </Grid>
            ))}
          </Grid>
        </Body>
      )}
    </Container>
  )
}

export { WeatherCardBase }
