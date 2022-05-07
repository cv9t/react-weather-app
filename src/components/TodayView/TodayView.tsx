import React from 'react'
import { CurrentWeatherType } from '../../types'

interface TodayViewProps {
  weatherData: CurrentWeatherType
}

function TodayView({ weatherData }: TodayViewProps) {
  return <div>{weatherData.feels_like}</div>
}

export { TodayView }
