/* eslint-disable no-console */

import React from 'react'
import { useSnackbar } from 'notistack'
import { WeatherService } from '../service'
import { LocationType, WeatherDataType } from '../types'

function useLocationWeather<T extends LocationType[] | LocationType>(
  location: T,
  errorMessage?: string
) {
  const [weather, setWeather] = React.useState<WeatherDataType[] | WeatherDataType | undefined>()
  const [loading, setLoading] = React.useState(false)
  const { enqueueSnackbar } = useSnackbar()

  React.useEffect(() => {
    const fetchedWeather = async () => {
      try {
        setLoading(true)

        if (location instanceof Array) {
          const promises = []
          for (let i = 0; i < location.length; i += 1) {
            promises.push(WeatherService.getOneCallWeatherForecast(location[i]))
          }

          const fetchedWeather = await Promise.all(promises)
          setWeather(fetchedWeather)
        } else {
          const fetchedWeather = await WeatherService.getOneCallWeatherForecast(location)
          setWeather(fetchedWeather)
        }
      } catch (e) {
        enqueueSnackbar(
          errorMessage ||
            `Can't fetch the ${location instanceof Array ? 'locations' : 'location'} weather `,
          { variant: 'error' }
        )
      } finally {
        setLoading(false)
      }
    }

    fetchedWeather()
  }, [location])

  return [
    weather as (T extends LocationType[] ? WeatherDataType[] : WeatherDataType) | undefined,
    loading,
  ] as const
}

export { useLocationWeather }
