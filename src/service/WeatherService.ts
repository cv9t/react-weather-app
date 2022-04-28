import axios from 'axios'
import { LatLngType, WeatherDataType } from '../types'

const API_URL = {
  ONE_CALL: 'https://api.openweathermap.org/data/2.5/onecall?',
}

class WeatherService {
  static ONE_CALL_API_URL = 'https://api.openweathermap.org/data/2.5/onecall?'

  public static async getOneCallWeatherForecast({ lat, lng }: LatLngType) {
    const weather = await axios.get(API_URL.ONE_CALL, {
      params: {
        lat,
        lon: lng,
        units: 'metric',
        lang: 'en',
        appid: process.env.OPENWEATHER_API_KEY,
      },
    })

    return weather.data as WeatherDataType
  }
}

export { WeatherService }
