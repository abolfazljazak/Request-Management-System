import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PersistenceService } from "@modules/persistence/persistence.service";
import { InfrastructureService } from "@modules/Infrastructure/infrastructure.service";
import { TGetCityResponse } from "@modules/api/types/get-city-response.type";
import { GetCityQuery } from "./get-city.query";

@QueryHandler(GetCityQuery)
export class GetCityQueryHandler implements IQueryHandler<GetCityQuery> {
  constructor(
    private readonly persistenceService: PersistenceService,
    private readonly infrastructureService: InfrastructureService,
  ) {}

  async execute(query: GetCityQuery): Promise<TGetCityResponse> {
    const { id, postCode } = query;
    const userRequest = await this.persistenceService.createUserRequest({
      userId: id,
      requestType: "getCity",
      postCode,
    });

    const cityData = await this.infrastructureService.getCityData(postCode);

    await this.persistenceService.updateUserRequest(userRequest.id, {
      postCode,
      country: cityData.country,
      places: cityData.places.map((place) => ({
        placeName: place.placeName,
        state: place.state,
        abbreviation: place.stateAbbreviation,
      })),
    });

    const getCityResponse = {
      postCode,
      country: cityData.country,
      places: cityData.places.map((place) => ({
        placeName: place["place name"],
        state: place.state,
        abbreviation: place["state abbreviation"],
      })),
    };
    return getCityResponse;
  }
}
