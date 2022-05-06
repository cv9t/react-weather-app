import axios from 'axios'
import { LocationType, WeatherDataType } from '../types'
import { geocodeByAddress, getLatLng } from '../utils'

const API_URL = {
  ONE_CALL: 'https://api.openweathermap.org/data/2.5/onecall?',
}

class WeatherService {
  public static async getOneCallWeatherForecast(location: LocationType) {
    const results = await geocodeByAddress(location.description)
    const { lat, lng } = await getLatLng(results[0])

    const weather = await axios.get(API_URL.ONE_CALL, {
      params: {
        lat,
        lon: lng,
        units: 'metric',
        lang: 'en',
        appid: process.env.OPENWEATHER_API_KEY,
      },
    })

    console.log(weather.data)

    return weather.data as WeatherDataType
  }
}

export { WeatherService }
