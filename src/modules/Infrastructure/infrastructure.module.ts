import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { InfrastructureService } from "./infrastructure.service";
import { JwtStrategy } from "./auth/jwt.strategy";
import { EncryptionService } from "./services/encryption.service";
import { ZippoService } from "./services/zippo.service";

@Module({
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("Jwt.accessTokenSecret"),
        signOptions: {
          expiresIn: configService.get<string>("Jwt.expire"),
        },
      }),
    }),
  ],
  providers: [
    InfrastructureService,
    JwtService,
    ConfigService,
    JwtStrategy,
    EncryptionService,
    ZippoService,
  ],
  exports: [
    InfrastructureService,
    JwtService,
    ConfigService,
    JwtStrategy,
    EncryptionService,
    ZippoService,
  ],
})
export class InfrastructureModule {}
