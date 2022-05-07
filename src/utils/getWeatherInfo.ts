import moment from 'moment'
import {
  OneCallWeatherDataType,
  WeatherType,
  WeatherAlertType,
  OneCallDailyWeatherType,
  DailyWeatherType,
  OneCallWeatherAlertType,
  OneCallHourlyWeatherType,
  HourlyWeatherType,
  OneCallCurrentWeatherType,
  CurrentWeatherType,
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

function getCurrentWeather(weatherData: OneCallCurrentWeatherType) {
  const weather: CurrentWeatherType = {
    dt: moment(weatherData.dt, 'X'),
    temp: Math.round(weatherData.temp),
    feels_like: Math.round(weatherData.feels_like),
    description: capitalizeString(weatherData.weather[0].description),
    icon: {
      src: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
    },
  }

  return weather
}

function getDailyWeather(weatherData: OneCallDailyWeatherType) {
  const weather: DailyWeatherType = {
    dt: moment(weatherData.dt, 'X'),
    temp: {
      day: Math.round(weatherData.temp.day),
      night: Math.round(weatherData.temp.night),
      min: Math.round(weatherData.temp.min),
      max: Math.round(weatherData.temp.max),
      morn: Math.round(weatherData.temp.morn),
    },
    feels_like: {
      day: Math.round(weatherData.feels_like.day),
      night: Math.round(weatherData.feels_like.night),
      morn: Math.round(weatherData.feels_like.morn),
    },
    dew_point: Math.round(weatherData.dew_point),
    wind_deg: Math.round(weatherData.wind_gust),
    wind_speed: Math.round(weatherData.wind_speed),
    wind_gust: Math.round(weatherData.wind_gust),
    pressure: Math.round(weatherData.pressure),
    humidity: weatherData.humidity,
    clouds: weatherData.clouds,
    description: capitalizeString(weatherData.weather[0].description),
    icon: {
      src: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
    },
    pop: Math.round(weatherData.pop * 100),
  }

  return weather
}

function getHourlyWeather(weatherData: OneCallHourlyWeatherType) {
  const weather: HourlyWeatherType = {
    dt: moment(weatherData.dt, 'X'),
    temp: Math.round(weatherData.temp),
    feels_like: Math.round(weatherData.feels_like),
    wind_speed: Math.round(weatherData.wind_speed),
    wind_gust: Math.round(weatherData.wind_gust),
    pressure: Math.round(weatherData.pressure),
    wind_deg: Math.round(weatherData.wind_gust),
    visibility: Math.round(weatherData.visibility / 1000),
    uvi: Math.round(weatherData.uvi),
    humidity: weatherData.humidity,
    clouds: weatherData.clouds,
    description: capitalizeString(weatherData.weather[0].description),
    icon: {
      src: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
    },
    pop: Math.round(weatherData.pop * 100),
  }

  return weather
}

function getWeatherInfo(weatherData: OneCallWeatherDataType) {
  const weather: WeatherType = {
    alerts: weatherData.alerts ? getUniqueAlerts(weatherData.alerts) : [],
    current: getCurrentWeather(weatherData.current),
    daily: weatherData.daily.map(getDailyWeather),
    hourly: weatherData.hourly.map(getHourlyWeather),
  }

  return weather
}

export { getWeatherInfo }
