import { Moment } from 'moment'

export type OneCallCurrentWeatherType = {
  dt: number
  sunrise: number
  sunset: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  rain?: {
    '1h'?: number
    '3h'?: number
  }
}

export type OneCallDailyWeatherType = {
  dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  temp: {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }
  feels_like: {
    day: number
    night: number
    eve: number
    morn: number
  }
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  clouds: number
  pop: number
  rain: number
  uvi: number
}

export type OneCallHourlyWeatherType = {
  dt: number
  sunrise: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  clouds: number
  pop: number
  uvi: number
}

export interface OneCallWeatherAlertType {
  start: number
  end: number
  event: string
  tags: string[]
}

export interface OneCallWeatherDataType {
  alerts: OneCallWeatherAlertType[]
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: OneCallCurrentWeatherType
  daily: OneCallDailyWeatherType[]
  hourly: OneCallHourlyWeatherType[]
}

export interface CurrentWeatherType {
  dt: Moment
  temp: number
  feels_like: number
  description: string
  icon: {
    src: string
  }
}

export interface DailyWeatherType {
  dt: Moment
  temp: {
    day: number
    night: number
  }
  pop: number
  feels_like: number
  wind_speed: number
  humidity: number
  clouds: number
  description: string
  icon: {
    src: string
  }
}

export interface HourlyWeatherType {
  dt: Moment
  temp: number
  feels_like: number
  wind_speed: number
  humidity: number
  clouds: number
  pop: number
  description: string
  icon: {
    src: string
  }
}

export interface WeatherAlertType {
  start: Moment
  end: Moment
  event: string
  tags: string[]
}

export interface WeatherType {
  alerts: WeatherAlertType[]
  current: CurrentWeatherType
  daily: DailyWeatherType[]
  hourly: HourlyWeatherType[]
}
