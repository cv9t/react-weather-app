import React, { useMemo } from 'react'
import { useLocalStorage } from '../hooks'
import { LocationType } from '../types'

const initialValue = [
  {
    // coords: { lat: 35.6803997, lng: 139.7690174 },
    description: 'Tokyo, Japan',
    placeId: 'ChIJXSModoWLGGARILWiCfeu2M0',
  },
  {
    // coords: { lat: 51.5072178, lng: -0.1275862 },
    description: 'London, UK',
    placeId: 'ChIJdd4hrwug2EcRmSrV3Vo6llI',
  },
  {
    // coords: { lat: 40.7127753, lng: -74.0059728 },
    description: 'New York, NY, USA',
    placeId: 'ChIJOwg_06VPwokRYv534QaPC8g',
  },
]

const maxRecentLocations = 3

interface RecentLocationsContextType {
  recentLocations: LocationType[]
  saveRecentLocation: (location: LocationType) => void
}

const RecentLocationsContext = React.createContext<RecentLocationsContextType>({
  recentLocations: [],
  saveRecentLocation: () => {},
})

function RecentLocationsProvider({ children }: { children: React.ReactNode }) {
  const [recentLocations, setRecentLocations] = useLocalStorage<LocationType[]>(
    'recentLocations',
    initialValue
  )

  const saveRecentLocation = (location: LocationType) => {
    const locationIdx = recentLocations.findIndex((l) => l.placeId === location.placeId)

    if (locationIdx === -1) {
      setRecentLocations((prev) => [location, ...prev.slice(0, maxRecentLocations - 1)])
    } else if (locationIdx !== 0) {
      setRecentLocations((prev) => [
        location,
        ...prev.slice(0, locationIdx),
        ...prev.slice(locationIdx + 1, maxRecentLocations),
      ])
    }
  }

  const value = useMemo(
    () => ({
      recentLocations,
      saveRecentLocation,
    }),
    [recentLocations]
  )

  return <RecentLocationsContext.Provider value={value}>{children}</RecentLocationsContext.Provider>
}

export { RecentLocationsContext, RecentLocationsContextType, RecentLocationsProvider }
