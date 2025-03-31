import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PersistenceService } from "@modules/persistence/persistence.service";
import { InfrastructureService } from "@modules/Infrastructure/infrastructure.service";
import { SignUpCommand } from "./sign-up.command";
import { TSignUpResponse } from "@modules/api/types/sign-up-response.type";

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    private readonly persistenceService: PersistenceService,
    private readonly infrastructureService: InfrastructureService,
  ) {}

  async execute(command: SignUpCommand): Promise<TSignUpResponse> {
    const { username, password } = command;
    const hashPassword = this.infrastructureService.encryptPassword(password);
    const user = await this.persistenceService.createUser({ username, hashPassword });
    const accessToken = await this.infrastructureService.createAccessToken({
      sub: user.id,
      username: user.username,
    });
    const signUpResponse:  TSignUpResponse = {
      user: { id: user.id, username: user.username },
      accessToken,
    };
    return signUpResponse;
  }
}
