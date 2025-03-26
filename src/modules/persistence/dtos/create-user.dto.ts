import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  hashPassowrd: string;

  @IsNotEmpty()
  @IsString()
  postCode: string;
}
