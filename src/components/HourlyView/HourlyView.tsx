import moment from 'moment'
import React from 'react'
import { HourlyWeatherType, WeatherAlertType } from '../../types'
import { WeatherHourCard } from '../UI'
import { HourlyViewContainer, TimeInterval } from './HourlyView.styled'

interface HourlyViewProps {
  weatherData: HourlyWeatherType[]
  alerts: WeatherAlertType[]
}

function HourlyView({ weatherData, alerts }: HourlyViewProps) {
  const filteredWeatherData = weatherData.filter((w) =>
    w.dt.isBetween(moment(), moment().clone().add(1, 'day').startOf('day'), 'day', '[)')
  )

  return (
    <HourlyViewContainer>
      <TimeInterval>
        {`${filteredWeatherData[0].dt.format('hA')} - ${filteredWeatherData[
          filteredWeatherData.length - 1
        ].dt.format('hA')}`}
      </TimeInterval>
      {filteredWeatherData.map((weather, idx) => (
        <WeatherHourCard
          key={weather.dt.format('X')}
          weather={weather}
          alerts={alerts.filter((alert) =>
            weather.dt.isBetween(alert.start, alert.end, 'hour', '[]')
          )}
          opened={idx === 0}
        />
      ))}
    </HourlyViewContainer>
  )
}

export { HourlyView }
