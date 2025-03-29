import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { TokensPayload } from "../types/payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("Jwt.accessTokenSecret"),
      expiresIn: configService.get<string>("Jwt.expire"),
    });
  }

  async validate(payload: TokensPayload) {
    return { userId: payload.sub, username: payload.username };
  }
}
