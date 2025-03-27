import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../Infrastructure/infrastructure.module";
import { CustomConfigModule } from "../config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmDbConfig } from "src/config/typeorm.config";

@Module({
  imports: [CustomConfigModule, InfrastructureModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmDbConfig
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
