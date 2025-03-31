import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMyRequestQuery } from "./get-my-request.query";
import { PersistenceService } from "@modules/persistence/persistence.service";

@QueryHandler(GetMyRequestQuery)
export class GetMyRequestQueryHandler implements IQueryHandler<GetMyRequestQuery> {
    constructor(private readonly persistenceService: PersistenceService) {}
  async execute(query: GetMyRequestQuery) {
    const { id } = query;
    const userRequests = await this.persistenceService.getUserRequests(id);
    return userRequests;
  }
}   