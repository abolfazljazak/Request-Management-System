export type TGetCityResponse = {
  postCode: string;
  country: string;
  places: TPlace[];
};

type TPlace = {
  placeName: string;
  state: string;
  abbreviation: string;
};
