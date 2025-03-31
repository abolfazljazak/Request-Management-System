import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@modules/Infrastructure/auth/jwt-auth.guard";
import { QueryBus } from "@nestjs/cqrs";
import { GetCityQuery } from "../queries/cities/get-city/get-city.query";
import { getUser } from "@common/decorators/user.decorator";
import { TGetUser } from "../types/get-user.type";

@Controller("api/cities")
export class CitiesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(":postCode")
  @UseGuards(JwtAuthGuard)
  getCityData(@Param("postCode") postCode: string, @getUser() user: TGetUser) {
    return this.queryBus.execute(new GetCityQuery(user.userId, postCode));
  }

  @Get("my-request")
  @UseGuards(JwtAuthGuard)
  getMyRequest() {}
}
