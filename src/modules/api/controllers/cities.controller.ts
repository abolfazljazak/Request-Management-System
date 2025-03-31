import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@modules/Infrastructure/auth/jwt-auth.guard";
import { QueryBus } from "@nestjs/cqrs";
import { getUser } from "@common/decorators/user.decorator";
import { GetCityQuery } from "../queries/cities/get-city/get-city.query";
import { TGetUser } from "../types/get-user.type";
import { GetMyRequestQuery } from "../queries/cities/get-my-request/get-my-request.query";
import { PaginationDto } from "@common/dtos/pagination.dto";

@Controller("api/cities")
export class CitiesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get("my-request")
  @UseGuards(JwtAuthGuard)
  getMyRequest(@getUser() user: TGetUser, @Query() paginationDto: PaginationDto) {
    return this.queryBus.execute(new GetMyRequestQuery(user.userId, paginationDto));
  }

  @Get(":postCode")
  @UseGuards(JwtAuthGuard)
  getCityData(@Param("postCode") postCode: string, @getUser() user: TGetUser) {
    return this.queryBus.execute(new GetCityQuery(user.userId, postCode));
  }
}
