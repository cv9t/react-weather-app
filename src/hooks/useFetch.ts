/* eslint-disable no-console */
import React from 'react'

function useFetch(callback: () => void) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)

  const fetch = async () => {
    try {
      setIsError(false)
      setIsLoading(true)
      await callback()
    } catch (e) {
      console.log('useFetch error: ', e.message)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return [fetch, isLoading, isError] as const
}

export { useFetch }
