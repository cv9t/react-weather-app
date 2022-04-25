export interface CoordsType {
  lat: number;
  lng: number;
}

export interface LocationType {
  description: string;
  placeId: string;
  coords: CoordsType;
}
