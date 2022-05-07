/* eslint-disable no-console */
import React from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { WeatherService } from '../service'
import { LocationType, WeatherType } from '../types'

function useLocationWeather<T extends LocationType[] | LocationType>(
  location: T,
  errorMessage?: string
) {
  const [weather, setWeather] = React.useState<WeatherType[] | WeatherType | undefined>()
  const [loading, setLoading] = React.useState(false)
  const { enqueueSnackbar } = useSnackbar()

  React.useEffect(() => {
    let source = axios.CancelToken.source()

    const fetchedWeather = async () => {
      try {
        setLoading(true)

        if (location instanceof Array) {
          const promises = []
          for (let i = 0; i < location.length; i += 1) {
            promises.push(WeatherService.getOneCallWeatherForecast(location[i], source.token))
          }

          const fetchedWeather = await Promise.all(promises)
          setWeather(fetchedWeather)
        } else {
          const fetchedWeather = await WeatherService.getOneCallWeatherForecast(
            location,
            source.token
          )
          setWeather(fetchedWeather)
        }
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log('aborted')
        } else {
          enqueueSnackbar(
            errorMessage ||
              `Can't fetch the ${location instanceof Array ? 'locations' : 'location'} weather `,
            { variant: 'error' }
          )
          console.error(e)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchedWeather()

    return () => {
      if (source) {
        source.cancel()
        source = axios.CancelToken.source()
      }
    }
  }, [location])

  return [
    weather as (T extends LocationType[] ? WeatherType[] : WeatherType) | undefined,
    loading,
  ] as const
}

export { useLocationWeather }
