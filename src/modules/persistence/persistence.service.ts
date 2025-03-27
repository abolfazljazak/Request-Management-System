import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { ConflictMessage, NotFoundMessage, SuccessMessage } from "src/common/enums/message.enum";

@Injectable()
export class PersistenceService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  async userExists(username: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { username, hashPassword, postCode } = createUserDto;

    const userExists = await this.userExists(username);
    if (userExists) throw new ConflictException(ConflictMessage.UserAlreadyExists);

    const user = this.userRepository.create({
      username,
      postCode,
      password: hashPassword,
    });
    return this.userRepository.save(user);
  }

  async userFindByUsername(username: string): Promise<UserEntity> {
    const userExists = await this.userExists(username);
    if (!userExists) throw new NotFoundException(NotFoundMessage.UserNotFound);
    return userExists;
  }

  async userFindById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(NotFoundMessage.UserNotFound);
    return user;
  }
}
