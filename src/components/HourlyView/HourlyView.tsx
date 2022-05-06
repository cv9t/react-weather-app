import React from 'react'
import moment from 'moment'
import { WeatherDataType } from '../../types'
import { HourlyViewContainer } from './HourlyView.styled'

interface HourlyViewProps {
  weather: WeatherDataType
}

function HourlyView({ weather }: HourlyViewProps) {
  return <HourlyViewContainer>Hourly View</HourlyViewContainer>
}

export { HourlyView }
