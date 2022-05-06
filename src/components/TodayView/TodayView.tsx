import React from 'react'
import { WeatherDataType } from '../../types'

interface TodayViewProps {
  weather: WeatherDataType
}

function TodayView({ weather }: TodayViewProps) {
  return <div>Today View</div>
}

export { TodayView }
