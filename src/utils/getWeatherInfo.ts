import moment from 'moment'
import {
  OneCallWeatherDataType,
  WeatherType,
  WeatherAlertType,
  OneCallDailyWeatherType,
  DailyWeatherType,
  OneCallWeatherAlertType,
} from '../types'
import { capitalizeString } from './capitalizeString'

function getUniqueAlerts(alerts: OneCallWeatherAlertType[]) {
  const res: WeatherAlertType[] = []
  for (let i = 0; i < alerts.length; i += 1) {
    const alert = alerts[i]
    if (!res.find((a) => JSON.stringify(a.tags) === JSON.stringify(alert.tags))) {
      res.push({ ...alert, start: moment(alert.start, 'X'), end: moment(alert.end, 'X') })
    }
  }
  return res
}

function getDailyWeather(weatherData: OneCallDailyWeatherType) {
  const weather: DailyWeatherType = {
    dt: moment(weatherData.dt, 'X'),
    temp: {
      day: Math.round(weatherData.temp.day),
      night: Math.round(weatherData.temp.night),
    },
    feels_like: Math.round(weatherData.feels_like.day),
    wind_speed: Math.round(weatherData.wind_speed),
    humidity: weatherData.humidity,
    clouds: weatherData.clouds,
    description: capitalizeString(weatherData.weather[0].description),
    icon: {
      src: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
    },
  }

  return weather
}

function getWeatherInfo(weatherData: OneCallWeatherDataType) {
  const weather: WeatherType = {
    alerts: weatherData.alerts ? getUniqueAlerts(weatherData.alerts) : [],
    current: {
      dt: moment(weatherData.current.dt, 'X'),
      temp: Math.round(weatherData.current.temp),
      feels_like: Math.round(weatherData.current.feels_like),
      description: capitalizeString(weatherData.current.weather[0].description),
      icon: {
        src: `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`,
      },
    },
    daily: weatherData.daily.map(getDailyWeather),
  }

  return weather
}

export { getWeatherInfo }
