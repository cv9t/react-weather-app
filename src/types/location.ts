export interface LatLngType {
  lat: number
  lng: number
}

export interface LocationType {
  placeId: string
  description: string
  coords: LatLngType
}
