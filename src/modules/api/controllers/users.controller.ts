import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { getUser } from "@common/decorators/user.decorator";
import { JwtAuthGuard } from "@modules/Infrastructure/auth/jwt-auth.guard";
import { SignUpDto } from "../dtos/sign-up.dto";
import { SignUpCommand } from "../commands/sign-up/sign-up.command";
import { TGetUser } from "../types/get-user.type";
import { GetUserQuery } from "../queries/users/get-user/get-user.query";

@Controller("api/users")
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post("sign-up")
  signUp(@Body() signUpDto: SignUpDto) {
    const { username, password } = signUpDto;
    return this.commandBus.execute(new SignUpCommand(username, password));
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  userMe(@getUser() user: TGetUser) {
    return this.queryBus.execute(new GetUserQuery(user.userId));
  }
}
