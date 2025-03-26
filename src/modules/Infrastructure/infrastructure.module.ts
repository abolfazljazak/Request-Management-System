import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { InfrastructureService } from "./infrastructure.service";
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [InfrastructureService, JwtService, ConfigService],
  exports: [InfrastructureService, JwtService, ConfigService],
})
export class InfrastructureModule {}
