import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { SignUpDto } from "./dtos/sign-up.dto";
import { JwtAuthGuard } from "../Infrastructure/auth/jwt-auth.guard";
import { CommandBus } from "@nestjs/cqrs";
import { CreateUserHandler } from "./commands/create-user.handler";
import { CreateUserCommand } from "./commands/create-user.command";

@Controller("api")
export class ApiController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post("users/sign-up")
  signUp(@Body() signUpDto: SignUpDto) {
    const { username, password, postCode } = signUpDto;
    return this.commandBus.execute(new CreateUserCommand(username, password, postCode));
  }
}
