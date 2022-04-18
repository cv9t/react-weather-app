import { CityType, CountryType } from '../types';

function convertToCityArray(arr: CountryType[]): CityType[] {
  const res = [];

  for (let i = 0; i < arr.length; i += 1) {
    const country = arr[i].name;
    for (let j = 0; j < arr[i].states.length; j += 1) {
      const { name } = arr[i].states[j];
      res.push({ country, name });
    }
  }

  return res;
}

export { convertToCityArray };
