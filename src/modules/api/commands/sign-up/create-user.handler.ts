import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PersistenceService } from "@modules/persistence/persistence.service";
import { InfrastructureService } from "@modules/Infrastructure/infrastructure.service";
import { SignUpCommand } from "./create-user.command";
import { SignUpResponseDto } from "../../dtos/user-response.dto";

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    private readonly persistenceService: PersistenceService,
    private readonly infrastructureService: InfrastructureService,
  ) {}

  async execute(command: SignUpCommand): Promise<SignUpResponseDto> {
    const { username, password, postCode } = command;
    const hashPassword = this.infrastructureService.encryptPassword(password);
    const user = await this.persistenceService.createUser({ username, hashPassword, postCode });
    const accessToken = await this.infrastructureService.createAccessToken({
      sub: user.id,
      username: user.username,
    });
    const signUpResponse: SignUpResponseDto = {
      user: { id: user.id, username: user.username, postCode: user.postCode },
      accessToken,
    };
    return signUpResponse;
  }
}
