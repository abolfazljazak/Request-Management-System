import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { SignUpDto } from "./dtos/sign-up.dto";
import { SignUpCommand } from "./commands/sign-up/create-user.command";

@Controller("api")
export class ApiController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post("users/sign-up")
  signUp(@Body() signUpDto: SignUpDto) {
    const { username, password, postCode } = signUpDto;
    return this.commandBus.execute(new SignUpCommand(username, password, postCode));
  }
}
