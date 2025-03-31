import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PersistenceService } from "@modules/persistence/persistence.service";
import { UserRequestEntity } from "@modules/persistence/entities/user-request.entity";
import { GetMyRequestQuery } from "./get-my-request.query";

@QueryHandler(GetMyRequestQuery)
export class GetMyRequestQueryHandler implements IQueryHandler<GetMyRequestQuery> {
  constructor(private readonly persistenceService: PersistenceService) {}

  async execute(query: GetMyRequestQuery): Promise<UserRequestEntity[]> {
    const { id } = query;
    return this.persistenceService.getUserRequests(id);
  }
}
