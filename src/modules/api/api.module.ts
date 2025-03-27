import { Module } from "@nestjs/common";
import { ApiController } from "./api.controller";
import { PersistenceModule } from "../persistence/persistence.module";
import { InfrastructureModule } from "../Infrastructure/infrastructure.module";

@Module({
  imports: [PersistenceModule, InfrastructureModule],
  controllers: [ApiController],
})
export class ApiModule {}
