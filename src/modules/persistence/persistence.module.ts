import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { PersistenceService } from "./persistence.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [PersistenceService],
  exports: [PersistenceService, TypeOrmModule],
})
export class PersistenceModule {}
