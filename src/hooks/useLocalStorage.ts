/* eslint-disable no-console */
import React from 'react'

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (e) {
      console.error(e)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error('useLocalStorage error: ', error)
    }
  }
  return [storedValue, setValue] as const
}

export { useLocalStorage }
