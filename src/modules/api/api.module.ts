import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { UsersController } from "./controllers/users.controller";
import { PersistenceModule } from "../persistence/persistence.module";
import { InfrastructureModule } from "../Infrastructure/infrastructure.module";
import { SignUpCommandHandler } from "./commands/sign-up/sign-up.handler";
import { GetUserQueryHandler } from "./queries/users/get-user/get-user.handler";
import { CitiesController } from "./controllers/cities.controller";
import { GetCityQueryHandler } from "./queries/cities/get-city/get-city.handler";

@Module({
  imports: [PersistenceModule, InfrastructureModule, CqrsModule],
  controllers: [UsersController, CitiesController],
  providers: [SignUpCommandHandler, GetUserQueryHandler, GetCityQueryHandler],
})
export class ApiModule {}
