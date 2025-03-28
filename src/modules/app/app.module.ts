import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmDbConfig } from "@config/typeorm.config";
import { InfrastructureModule } from "../Infrastructure/infrastructure.module";
import { CustomConfigModule } from "../config/config.module";
import { ApiModule } from "@modules/api/api.module";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
  imports: [
    ApiModule,
    CqrsModule,
    CustomConfigModule,
    InfrastructureModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmDbConfig,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
