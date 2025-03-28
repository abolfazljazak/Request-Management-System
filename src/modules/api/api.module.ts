import { Module } from "@nestjs/common";
import { ApiController } from "./api.controller";
import { PersistenceModule } from "../persistence/persistence.module";
import { InfrastructureModule } from "../Infrastructure/infrastructure.module";
import { CqrsModule } from "@nestjs/cqrs";
import { SignUpCommandHandler } from "./commands/sign-up/sign-up.handler";

@Module({
  imports: [PersistenceModule, InfrastructureModule, CqrsModule],
  controllers: [ApiController],
  providers: [SignUpCommandHandler],
})
export class ApiModule {}
