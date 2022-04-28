/* eslint-disable no-console */
function geocodeByAddress(address: string): Promise<google.maps.GeocoderResult[]> {
  const geocoder = new window.google.maps.Geocoder()
  const { OK } = window.google.maps.GeocoderStatus

  return new Promise((resolve, reject) => {
    geocoder.geocode(
      { address },
      (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
        if (status !== OK) {
          console.error('geocodeByAddress error: ', status)
          reject(status)
        }

        resolve(results)
      }
    )
  })
}

export { geocodeByAddress }
