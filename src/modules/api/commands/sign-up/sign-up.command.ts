import { ICommand } from "@nestjs/cqrs";

export class SignUpCommand implements ICommand {
  constructor(
    public readonly username: string,
    public readonly password: string,
  ) {}
}
