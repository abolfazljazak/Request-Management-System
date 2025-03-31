import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@modules/Infrastructure/auth/jwt-auth.guard";
import { InfrastructureService } from "@modules/Infrastructure/infrastructure.service";

@Controller("api/cities")
export class CitiesController {
  constructor(private readonly infrastructureService: InfrastructureService) {}
  @Get(":postCode")
  @UseGuards(JwtAuthGuard)

  getCityWithPostCode(@Param("postCode") postCode: string) {
    return this.infrastructureService.getCityData(postCode);
  }

  @Get("my-request")
  @UseGuards(JwtAuthGuard)
  getMyRequest() {}
}
