export interface CityType {
  country: string;
  name: string;
}

export interface CountryType {
  name: string;
  states: {
    name: string;
  }[];
}

export interface CityServiceResponse {
  data: CountryType[];
}
