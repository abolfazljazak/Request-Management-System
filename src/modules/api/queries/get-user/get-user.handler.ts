import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PersistenceService } from "@modules/persistence/persistence.service";
import { InfrastructureService } from "@modules/Infrastructure/infrastructure.service";
import { GetUserQuery } from "./get-user.query";

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    private readonly persistenceService: PersistenceService,
    private readonly infrastructureService: InfrastructureService,
  ) {}

  async execute(query: GetUserQuery) {
    const { id } = query;
    const user = await this.persistenceService.userFindById(id);
    const { postCode } = user;
    const decodePassword = this.infrastructureService.decryptPassword(user.password);
    const city = await this.infrastructureService.getCityData({ postCode });
    return { city, decodePassword };
  }
}
