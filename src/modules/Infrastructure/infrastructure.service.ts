import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TokensPayload } from "./types/palyload";
import { PostCodeDto } from "./dtos/postcode.dto";
import { EncryptionService } from "./services/encryption.service";
import { ZippoResponse } from "./interfaces/zippo.interface";
import { ZippoService } from "./services/zippo.service";

@Injectable()
export class InfrastructureService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly encryptionService: EncryptionService,
    private readonly zippoService: ZippoService,
  ) {}

  async createAccessToken(payload: TokensPayload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get("jwt.accessTokenSecret"),
      expiresIn: this.configService.get("jwt.expire"),
    });

    return accessToken;
  }

  async getCityData(PostCodeDto: PostCodeDto): Promise<ZippoResponse> {
    return this.zippoService.getCityData(PostCodeDto);
  }

  encryptPassword(password: string): string {
    return this.encryptionService.encrypt(password);
  }

  decryptPassword(password: string): string {
    return this.encryptionService.decrypt(password);
  }
}
