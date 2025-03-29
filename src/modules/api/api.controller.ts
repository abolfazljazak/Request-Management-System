import { Body, Controller, Get, Post, UseGuards, Req } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { SignUpDto } from "./dtos/sign-up.dto";
import { SignUpCommand } from "./commands/sign-up/sign-up.command";
import { TGetUser } from "./types/get-user.type";
import { getUser } from "@common/decorators/user.decorator";
import { JwtAuthGuard } from "@modules/Infrastructure/auth/jwt-auth.guard";
import { GetUserQuery } from "./queries/get-user/get-user.query";
import { Request } from "express";

@Controller("api")
export class ApiController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post("users/sign-up")
  signUp(@Body() signUpDto: SignUpDto) {
    
    const { username, password, postCode } = signUpDto;
    return this.commandBus.execute(new SignUpCommand(username, password, postCode));
  }

  @Get("users/me")
  @UseGuards(JwtAuthGuard)
  userMe(@getUser() user: TGetUser, @Req() req: Request) {
    return this.queryBus.execute(new GetUserQuery(user.userId));
  }
}
