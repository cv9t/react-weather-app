import { LatLngType } from '../types'

async function getCurrentLocation(): Promise<LatLngType | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const position: any = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })

    return { lat: position.coords.latitude, lng: position.coords.longitude }
  } catch (error) {
    return null
  }
}

export { getCurrentLocation }
