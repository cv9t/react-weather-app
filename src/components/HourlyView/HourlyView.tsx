import moment from 'moment'
import React from 'react'
import { HourlyWeatherType, WeatherAlertType } from '../../types'
import { WeatherHourCard } from '../UI'
import { HourlyViewContainer, DateInterval } from './HourlyView.styled'

interface HourlyViewProps {
  weather: HourlyWeatherType[]
  alerts: WeatherAlertType[]
}

function HourlyView({ weather, alerts }: HourlyViewProps) {
  const currentHoursWeather = weather.filter((w) =>
    w.dt.isBetween(moment(), moment().clone().add(1, 'day').startOf('day'), 'day', '[)')
  )

  return (
    <HourlyViewContainer>
      <DateInterval>
        {`${currentHoursWeather[0].dt.format('hA')} - ${currentHoursWeather[
          currentHoursWeather.length - 1
        ].dt.format('hA')}`}
      </DateInterval>
      {currentHoursWeather.map((w) => (
        <WeatherHourCard key={w.dt.format('X')} weather={w} alerts={alerts} />
      ))}
    </HourlyViewContainer>
  )
}

export { HourlyView }
