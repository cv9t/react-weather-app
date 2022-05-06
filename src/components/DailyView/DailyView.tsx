import React from 'react'
import moment from 'moment'
import { WeatherDataType } from '../../types'
import { DailyViewContainer, DateInterval } from './DailyView.styled'
import { WeatherCard } from '../UI'

interface DailyViewProps {
  weather: WeatherDataType
}

const convertToStringInterval = (weather: WeatherDataType) => {
  const begin = moment(weather.daily[0].sunrise, 'X').format('MMM D')
  const end = moment(weather.daily[weather.daily.length - 1].sunrise, 'X').format('MMM D')

  return `${begin} - ${end}`
}

function DailyView({ weather }: DailyViewProps) {
  return (
    <DailyViewContainer>
      <DateInterval>{convertToStringInterval(weather)}</DateInterval>
      {weather.daily.map((weather) => (
        <WeatherCard key={weather.dt} weather={weather} />
      ))}
    </DailyViewContainer>
  )
}

export { DailyView }
