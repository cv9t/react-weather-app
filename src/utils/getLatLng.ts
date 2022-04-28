/* eslint-disable no-console */
import { LatLngType } from '../types'

function getLatLng(result: google.maps.GeocoderResult): Promise<LatLngType> {
  return new Promise((resolve, reject) => {
    try {
      const latLng = {
        lat: result.geometry.location.lat(),
        lng: result.geometry.location.lng(),
      }
      resolve(latLng)
    } catch (e) {
      console.error('getLatLng error: ', e.message)
      reject(e)
    }
  })
}

export { getLatLng }
