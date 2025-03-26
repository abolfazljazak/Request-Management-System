export interface ZippoResponse {
  postCode: string;
  country: string;
  countryAbbreviation: string;
  places: {
    placeName: string;
    longitude: string;
    state: string;
    stateAbbreviation: string;
    latitude: string;
  }[];
}
