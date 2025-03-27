import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { InfrastructureService } from "./infrastructure.service";
import { JwtStrategy } from "./auth/jwt.strategy";

@Module({
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("jwt.accessTokenSecret"),
        signOptions: {
          expiresIn: configService.get<string>("jwt.expire"),
        },
      }),
    }),
  ],
  providers: [InfrastructureService, JwtService, ConfigService, JwtStrategy],
  exports: [InfrastructureService, JwtService, ConfigService, JwtStrategy],
})
export class InfrastructureModule {}
