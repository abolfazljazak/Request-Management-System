import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { PersistenceService } from "./persistence.service";
import { UserRequestEntity } from "./entities/user-request.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRequestEntity])],
  providers: [PersistenceService],
  exports: [PersistenceService, TypeOrmModule],
})
export class PersistenceModule {}
