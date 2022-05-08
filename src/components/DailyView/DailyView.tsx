import React from 'react'
import { DailyWeatherType, WeatherAlertType } from '../../types'
import { Container, DateInterval } from './DailyView.styled'
import { DayWeatherCard } from '../UI'

interface DailyViewProps {
  dailyWeatherForecast: DailyWeatherType[]
  alerts: WeatherAlertType[]
}

function DailyView({ dailyWeatherForecast, alerts }: DailyViewProps) {
  return (
    <Container>
      <DateInterval>
        {`${dailyWeatherForecast[0].dt.format('MMM D')} - ${dailyWeatherForecast[
          dailyWeatherForecast.length - 1
        ].dt.format('MMM D')}`}
      </DateInterval>
      {dailyWeatherForecast.map((weather) => (
        <DayWeatherCard
          key={weather.dt.format('X')}
          weather={weather}
          alerts={alerts.filter((alert) =>
            weather.dt.isBetween(alert.start, alert.end, 'date', '[]')
          )}
        />
      ))}
    </Container>
  )
}

export { DailyView }
