import React from 'react'
import { DailyWeatherType, WeatherAlertType } from '../../types'
import { DailyViewContainer, DateInterval } from './DailyView.styled'
import { WeatherCard } from '../UI'

interface DailyViewProps {
  weather: DailyWeatherType[]
  alerts: WeatherAlertType[]
}

function DailyView({ weather, alerts }: DailyViewProps) {
  return (
    <DailyViewContainer>
      <DateInterval>
        {`${weather[0].dt.format('MMM D')} - ${weather[weather.length - 1].dt.format('MMM D')}`}
      </DateInterval>
      {weather.map((w) => (
        <WeatherCard key={w.dt.format('X')} weather={w} alerts={alerts} />
      ))}
    </DailyViewContainer>
  )
}

export { DailyView }
