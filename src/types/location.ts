export interface LocationType extends google.maps.places.AutocompletePrediction {
  inputValue?: string;
}

export interface LatLng {
  lat: number;
  lng: number;
}
