import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@modules/Infrastructure/auth/jwt-auth.guard";
import { QueryBus } from "@nestjs/cqrs";
import { getUser } from "@common/decorators/user.decorator";
import { GetCityQuery } from "../queries/cities/get-city/get-city.query";
import { TGetUser } from "../types/get-user.type";
import { GetMyRequestQuery } from "../queries/cities/get-my-request/get-my-request.query";
import { PaginationDto } from "@common/dtos/pagination.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("Cities")
@Controller("api/cities")
export class CitiesController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({
    summary: "Get my requests",
    description: "Retrieves paginated list of user requests",
  })
  @ApiResponse({ status: 200, description: "Successfully retrieved requests" })
  @ApiResponse({ status: 401, description: "Unauthorized - Invalid or missing token" })
  @ApiResponse({ status: 403, description: "Forbidden - User does not have required permissions" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @ApiQuery({ name: "page", required: false, description: "Page number for pagination" })
  @ApiQuery({ name: "limit", required: false, description: "Number of items per page" })
  @ApiBearerAuth()
  @Get("my-request")
  @UseGuards(JwtAuthGuard)
  getMyRequest(@getUser() user: TGetUser, @Query() paginationDto: PaginationDto) {
    return this.queryBus.execute(new GetMyRequestQuery(user.userId, paginationDto));
  }

  @ApiOperation({
    summary: "Get city data",
    description: "Retrieves city information by post code",
  })
  @ApiResponse({ status: 200, description: "Successfully retrieved city data" })
  @ApiResponse({ status: 401, description: "Unauthorized - Invalid or missing token" })
  @ApiResponse({ status: 403, description: "Forbidden - User does not have required permissions" })
  @ApiResponse({ status: 404, description: "City not found for given post code" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @ApiParam({ name: "postCode", description: "Post code of the city", example: "12345" })
  @ApiBearerAuth()
  @Get(":postCode")
  @UseGuards(JwtAuthGuard)
  getCityData(@Param("postCode") postCode: string, @getUser() user: TGetUser) {
    return this.queryBus.execute(new GetCityQuery(user.userId, postCode));
  }
}
