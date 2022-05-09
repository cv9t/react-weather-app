import React from 'react'
import moment from 'moment'
import { HourlyWeatherType, WeatherAlertType } from '../../types'
import { HourWeatherCard } from '../UI'
import { Container, StyledSpan } from './HourlyView.styled'

interface HourlyViewProps {
  hourlyWeatherForecast: HourlyWeatherType[]
  alerts: WeatherAlertType[]
}

function HourlyView({ hourlyWeatherForecast, alerts }: HourlyViewProps) {
  const filteredHourlyWeatherForecast = hourlyWeatherForecast.filter((w) =>
    w.dt.isBetween(moment(), moment().clone().add(1, 'day').startOf('day'), 'day', '[)')
  )

  return (
    <Container>
      <StyledSpan>
        {`${filteredHourlyWeatherForecast[0].dt.format('hA')} - ${filteredHourlyWeatherForecast[
          filteredHourlyWeatherForecast.length - 1
        ].dt.format('hA')}`}
      </StyledSpan>
      {filteredHourlyWeatherForecast.map((weather, idx) => (
        <HourWeatherCard
          key={weather.dt.format('X')}
          weather={weather}
          alerts={alerts.filter((alert) =>
            weather.dt.isBetween(alert.start, alert.end, 'hour', '[]')
          )}
          opened={idx === 0}
        />
      ))}
    </Container>
  )
}

export { HourlyView }
