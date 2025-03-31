import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PersistenceService } from "@modules/persistence/persistence.service";
import { GetMyRequestQuery } from "./get-my-request.query";
import { TGetMyRequestResponse } from "@modules/api/types/get-my-request-response.type";

@QueryHandler(GetMyRequestQuery)
export class GetMyRequestQueryHandler implements IQueryHandler<GetMyRequestQuery> {
  constructor(private readonly persistenceService: PersistenceService) {}

  async execute(query: GetMyRequestQuery): Promise<TGetMyRequestResponse> {
    const { id, paginationDto } = query;
    return this.persistenceService.getUserRequests(id, paginationDto);
  }
}
