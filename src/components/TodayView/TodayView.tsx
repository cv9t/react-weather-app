import React from 'react'
import { CurrentWeatherType } from '../../types'

interface TodayViewProps {
  weather: CurrentWeatherType
}

function TodayView({ weather }: TodayViewProps) {
  return <div>{weather.feels_like}</div>
}

export { TodayView }
