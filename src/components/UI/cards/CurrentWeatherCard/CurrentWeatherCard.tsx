import React from 'react'
import { Grid, Tooltip, Typography } from '@mui/material'
import AirIcon from '@mui/icons-material/Air'
import OpacityIcon from '@mui/icons-material/Opacity'
import { CurrentWeatherType } from '../../../../types'
import { WeatherCardHeaderParam, WeatherCardBodyParam } from '../shared'
import { Container, StyledSpan } from './CurrentWeatherCard.styled'
import { ImgWrapper, BodyParam, HeaderParam } from '../WeatherCardBase/WeatherCardBase.styled'

interface CurrentWeatherCardProps {
  weather: CurrentWeatherType
}

function CurrentWeatherCard({ weather }: CurrentWeatherCardProps) {
  const headerParams: WeatherCardHeaderParam[] = [
    {
      title: 'Wind speed',
      icon: <AirIcon />,
      text: `${weather.wind_speed} m/s`,
    },
    {
      title: 'Probability of precipitation',
      icon: <OpacityIcon />,
      text: `${weather.pop}%`,
    },
  ]
  const bodyParams: WeatherCardBodyParam[] = [
    {
      title: 'Humidity',
      value: `${weather.humidity}%`,
    },
    {
      title: 'Cloudiness',
      value: `${weather.clouds}%`,
    },
    {
      title: 'Pressure',
      value: `${weather.pressure} hPa`,
    },
    {
      title: 'Visibility',
      value: `${weather.visibility} km`,
    },
    {
      title: 'Wind Direction (Deg)',
      value: `${weather.wind_deg}`,
    },
    {
      title: 'UV index',
      value: `${weather.uvi}`,
    },
  ]

  return (
    <Container>
      <StyledSpan>{weather.dt.format('dddd, MMMM Do YYYY, h:mm A')}</StyledSpan>
      <Grid container>
        <Grid container item xs={6} direction="column" alignItems="center" justifyContent="center">
          <Grid container mb={1}>
            <Grid container item direction="column" xs={4}>
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
            </Grid>
            <Grid container item xs={8}>
              <ImgWrapper>
                <img src={weather.icon.src} alt={weather.description} />
              </ImgWrapper>
              <Typography variant="h2">{weather.temp}°C</Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" lineHeight={1} mb={0.5}>
            {weather.description}
          </Typography>
          <Typography fontWeight={500} color="text.secondary">
            Feels like {weather.feels_like}°
          </Typography>
        </Grid>
        <Grid container direction="column" item xs={6}>
          <Typography fontWeight={500} mb={2}>
            Additional Information
          </Typography>
          <Grid container spacing={2}>
            {bodyParams.map((param) => (
              <Grid key={param.title} item xs={6}>
                <BodyParam>
                  <Typography color="text.secondary">{param.title}</Typography>
                  <Typography>{param.value}</Typography>
                </BodyParam>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export { CurrentWeatherCard }
