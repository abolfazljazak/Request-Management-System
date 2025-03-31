import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConflictMessage, NotFoundMessage } from "@common/enums/message.enum";
import { PaginationDto } from "@common/dtos/pagination.dto";
import { paginationGenerator, paginationSolver } from "@common/utils/pagination.util";
import { TGetMyRequestResponse } from "@modules/api/types/get-my-request-response.type";
import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserRequestEntity } from "./entities/user-request.entity";
import { TResponseData } from "./dtos/update-user-request.type";

@Injectable()
export class PersistenceService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserRequestEntity)
    private readonly userRequestRepository: Repository<UserRequestEntity>,
  ) {}

  async userExists(username: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { username, hashPassword } = createUserDto;

    const userExists = await this.userExists(username);
    if (userExists) throw new ConflictException(ConflictMessage.UserAlreadyExists);

    const user = this.userRepository.create({
      username,
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

  async createUserRequest(data: {
    userId: string;
    requestType: string;
    postCode?: string;
  }): Promise<UserRequestEntity> {
    const request = this.userRequestRepository.create(data);
    return this.userRequestRepository.save(request);
  }

  async updateUserRequest(id: string, responseData: TResponseData) {
    return this.userRequestRepository.update(id, { responseData });
  }

  async getUserRequests(
    userId: string,
    paginationDto: PaginationDto,
  ): Promise<TGetMyRequestResponse> {
    const { limit, page, skip } = paginationSolver(paginationDto);
    const [userRequests, count] = await this.userRequestRepository.findAndCount({
      where: { userId },
      skip,
      take: limit,
    });

    return {
      pagination: paginationGenerator(count, page, limit),
      userRequests,
    };
  }
}
