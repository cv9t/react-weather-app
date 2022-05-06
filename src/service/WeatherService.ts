import axios, { CancelToken } from 'axios'
import { LocationType, OneCallWeatherDataType } from '../types'
import { geocodeByAddress, getLatLng, getWeatherInfo } from '../utils'

const API_URL = {
  ONE_CALL: 'https://api.openweathermap.org/data/2.5/onecall?',
}

class WeatherService {
  public static async getOneCallWeatherForecast(location: LocationType, cancelToken?: CancelToken) {
    const results = await geocodeByAddress(location.description)
    const { lat, lng } = await getLatLng(results[0])

    const { data: weatherData }: { data: OneCallWeatherDataType } = await axios.get(
      API_URL.ONE_CALL,
      {
        params: {
          lat,
          lon: lng,
          units: 'metric',
          lang: 'en',
          appid: process.env.OPENWEATHER_API_KEY,
        },
        cancelToken,
      }
    )

    console.log(weatherData)

    const weather = getWeatherInfo(weatherData)

    return weather
  }
}

export { WeatherService }
