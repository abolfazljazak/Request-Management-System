import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ApiController } from "./api.controller";
import { PersistenceModule } from "../persistence/persistence.module";
import { InfrastructureModule } from "../Infrastructure/infrastructure.module";
import { SignUpCommandHandler } from "./commands/sign-up/sign-up.handler";
import { GetUserQueryHandler } from "./queries/get-user/get-user.handler";

@Module({
  imports: [PersistenceModule, InfrastructureModule, CqrsModule],
  controllers: [ApiController],
  providers: [SignUpCommandHandler, GetUserQueryHandler],
})
export class ApiModule {}
