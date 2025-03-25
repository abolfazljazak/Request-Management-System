import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../Infrastructure/infrastructure.module';
import { CustomConfigModule } from '../config/config.module';

@Module({
  imports: [
    CustomConfigModule,
    InfrastructureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
