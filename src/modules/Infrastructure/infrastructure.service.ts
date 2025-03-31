import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TokensPayload } from "./types/payload";
import { EncryptionService } from "./services/encryption.service";
import { ZippoResponse } from "./interfaces/zippo.interface";
import { ZippoService } from "./services/zippo.service";
import { PostCodeDto } from "@modules/api/dtos/post-code.dto";

@Injectable()
export class InfrastructureService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly encryptionService: EncryptionService,
    private readonly zippoService: ZippoService,
  ) {}

  async createAccessToken(payload: TokensPayload): Promise<string> {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get("Jwt.accessTokenSecret"),
      expiresIn: this.configService.get("Jwt.expire"),
    });

    return accessToken;
  }

  async getCityData(postCode: string): Promise<ZippoResponse> {
    return this.zippoService.getCityData(postCode);
  }

  encryptPassword(password: string): string {
    return this.encryptionService.encrypt(password);
  }

  decryptPassword(password: string): string {
    return this.encryptionService.decrypt(password);
  }
}
