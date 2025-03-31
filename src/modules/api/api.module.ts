import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { UsersController } from "./controllers/users.controller";
import { PersistenceModule } from "../persistence/persistence.module";
import { InfrastructureModule } from "../Infrastructure/infrastructure.module";
import { SignUpCommandHandler } from "./commands/sign-up/sign-up.handler";
import { GetUserQueryHandler } from "./queries/users/get-user/get-user.handler";
import { CitiesController } from "./controllers/cities.controller";
import { GetCityQueryHandler } from "./queries/cities/get-city/get-city.handler";
import { GetMyRequestQueryHandler } from "./queries/cities/get-my-request/get-my-request.handler";

@Module({
  imports: [PersistenceModule, InfrastructureModule, CqrsModule],
  controllers: [UsersController, CitiesController],
  providers: [
    SignUpCommandHandler,
    GetUserQueryHandler,
    GetCityQueryHandler,
    GetMyRequestQueryHandler,
  ],
})
export class ApiModule {}
