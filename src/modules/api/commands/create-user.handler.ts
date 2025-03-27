import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "./create-user.command";
import { PersistenceService } from "src/modules/persistence/persistence.service";
import { InfrastructureService } from "src/modules/Infrastructure/infrastructure.service";
import { SignUpResponseDto } from "../dtos/user-response.dto";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly persistenceService: PersistenceService,
    private readonly infrastructureService: InfrastructureService,
  ) {}

  async execute(command: CreateUserCommand): Promise<SignUpResponseDto> {
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
