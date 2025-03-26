import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable, NotFoundException, Post } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { NotFoundMessage, ServerErrorMessage } from "src/common/enums/message.enum";
import { PostCodeDto } from "../dtos/postcode.dto";
import { ZippoResponse } from "../interfaces/zippo.interface";

@Injectable()
export class ZippoService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getCityData(postCodeDto: PostCodeDto): Promise<ZippoResponse> {
    try {
      const { postCode } = postCodeDto;
      const baseUrl = this.configService.get("Zippo.apiUrl");
      const response = await firstValueFrom(this.httpService.get(`${baseUrl}/us/${postCode}`));
      return response.data as ZippoResponse;
    } catch (error) {
      if (error.response?.status === HttpStatus.NOT_FOUND)
        throw new NotFoundException(NotFoundMessage.PostCodeNotFound);

      throw new HttpException(
        ServerErrorMessage.FailedFetchCityData,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
