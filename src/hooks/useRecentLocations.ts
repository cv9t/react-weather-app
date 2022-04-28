import React from 'react'
import { RecentLocationsContext } from '../context'

function useRecentLocations() {
  const context = React.useContext(RecentLocationsContext)

  if (context === undefined) {
    throw new Error('useRecentLocations was used outside of its Provider')
  }

  return context
}

export { useRecentLocations }
