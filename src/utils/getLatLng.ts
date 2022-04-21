import { LatLng } from '../types';

function getLatLng(result: google.maps.GeocoderResult): Promise<LatLng> {
  return new Promise((resolve, reject) => {
    try {
      const latLng = {
        lat: result.geometry.location.lat(),
        lng: result.geometry.location.lng(),
      };
      resolve(latLng);
    } catch (e) {
      reject(e);
    }
  });
}

export { getLatLng };
