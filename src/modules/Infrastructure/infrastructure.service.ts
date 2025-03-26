import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TokensPayload } from "./types/palyload";

@Injectable()
export class InfrastructureService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createAccessToken(payload: TokensPayload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get("jwt.accessTokenSecret"),
      expiresIn: this.configService.get("jwt.expire"),
    });

    return accessToken;
  }
}
