import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { getUser } from "@common/decorators/user.decorator";
import { JwtAuthGuard } from "@modules/Infrastructure/auth/jwt-auth.guard";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
} from "@nestjs/swagger";
import { SwaggerConsumes } from "@common/enums/swagger-consumes.enum";
import { SignUpDto } from "../dtos/sign-up.dto";
import { SignUpCommand } from "../commands/sign-up/sign-up.command";
import { TGetUser } from "../types/get-user.type";
import { GetUserQuery } from "../queries/users/get-user/get-user.query";

@ApiTags("Users")
@Controller("api/users")
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({
    summary: "User registration",
    description: "Register a new user with username and password",
  })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 201, description: "User successfully created" })
  @ApiResponse({ status: 400, description: "Bad Request - Invalid input data" })
  @ApiResponse({ status: 409, description: "Conflict - Username already exists" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @Post("sign-up")
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  signUp(@Body() signUpDto: SignUpDto) {
    const { username, password } = signUpDto;
    return this.commandBus.execute(new SignUpCommand(username, password));
  }

  @ApiOperation({
    summary: "Get current user",
    description: "Retrieve the currently authenticated user's information",
  })
  @ApiResponse({ status: 200, description: "Successfully retrieved user data" })
  @ApiResponse({ status: 401, description: "Unauthorized - Invalid or missing token" })
  @ApiResponse({ status: 403, description: "Forbidden - User does not have required permissions" })
  @ApiResponse({ status: 404, description: "User not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @ApiBearerAuth()
  @Get("me")
  @UseGuards(JwtAuthGuard)
  userMe(@getUser() user: TGetUser) {
    return this.queryBus.execute(new GetUserQuery(user.userId));
  }
}
