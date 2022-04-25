import { CoordsType } from '../../types';

function geocodeByAddress(address: string): Promise<google.maps.GeocoderResult[]> {
  const geocoder = new window.google.maps.Geocoder();
  const { OK } = window.google.maps.GeocoderStatus;

  return new Promise((resolve, reject) => {
    geocoder.geocode(
      { address },
      (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
        if (status !== OK) {
          reject(status);
        }

        resolve(results);
      }
    );
  });
}

function getLatLng(result: google.maps.GeocoderResult): Promise<CoordsType> {
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

async function getLatLngByAddress(address: string): Promise<CoordsType> {
  const location = await geocodeByAddress(address);
  const latLng = await getLatLng(location[0]);

  return latLng;
}

export { geocodeByAddress, getLatLng, getLatLngByAddress };
