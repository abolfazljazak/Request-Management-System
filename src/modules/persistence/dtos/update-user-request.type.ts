export type TResponseData = {
  postCode: string;
  country: string;
  places: {
    placeName: string;
    state: string;
    abbreviation: string;
  }[];
};
