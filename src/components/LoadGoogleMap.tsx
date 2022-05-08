import React from 'react'
import { useJsApiLoader } from '@react-google-maps/api'
import { useSnackbar } from 'notistack'

interface LoadGoogleMapProps {
  children: React.ReactNode
}

const libraries: ('places' | 'drawing' | 'geometry' | 'localContext' | 'visualization')[] = [
  'places',
]

function LoadGoogleMap({ children }: LoadGoogleMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'maps',
    googleMapsApiKey: process.env.GOOGLE_PLACES_AUTOCOMPLETE_API_KEY || '',
    libraries,
  })
  const { enqueueSnackbar } = useSnackbar()

  React.useEffect(() => {
    if (loadError) {
      enqueueSnackbar("Can't load the google map", {
        variant: 'error',
      })
    }
  }, [loadError])

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry</div>
  }

  return <>{isLoaded && children}</>
}

export { LoadGoogleMap }
