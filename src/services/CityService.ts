import axios from 'axios';
import { convertToCityArray } from '../helpers';
import { CityType, CityServiceResponse } from '../types';

class CityService {
  static API_URL = 'https://countriesnow.space/api/v0.1/countries/states';

  static async fetchCities() {
    let cities: CityType[] = [];

    try {
      const { data }: { data: CityServiceResponse } = await axios.get(this.API_URL);
      cities = convertToCityArray(data.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`CityService Error ${err}`);
    }

    return cities;
  }
}

export { CityService };
