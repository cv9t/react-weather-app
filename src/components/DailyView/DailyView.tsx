import React from 'react'
import { DailyWeatherType, WeatherAlertType } from '../../types'
import { DailyViewContainer, DateInterval } from './DailyView.styled'
import { WeatherDayCard } from '../UI'

interface DailyViewProps {
  weatherData: DailyWeatherType[]
  alerts: WeatherAlertType[]
}

function DailyView({ weatherData, alerts }: DailyViewProps) {
  return (
    <DailyViewContainer>
      <DateInterval>
        {`${weatherData[0].dt.format('MMM D')} - ${weatherData[weatherData.length - 1].dt.format(
          'MMM D'
        )}`}
      </DateInterval>
      {weatherData.map((weather) => (
        <WeatherDayCard
          key={weather.dt.format('X')}
          weather={weather}
          alerts={alerts.filter((alert) =>
            weather.dt.isBetween(alert.start, alert.end, 'date', '[]')
          )}
        />
      ))}
    </DailyViewContainer>
  )
}

export { DailyView }
