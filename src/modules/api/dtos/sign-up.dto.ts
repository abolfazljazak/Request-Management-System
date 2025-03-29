import { IsNotEmpty, IsString, Length } from "class-validator";

export class SignUpDto {
  @IsNotEmpty({ message: "username is required" })
  @IsString({ message: "username must be a string" })
  @Length(3, 50, { message: "username must be between 3 and 50 characters" })
  username: string;

  @IsNotEmpty({ message: "password is required" })
  @IsString({ message: "password must be a string" })
  @Length(8, 100, { message: "password must be between 8 and 100 characters" })
  password: string;

  @IsNotEmpty({ message: "postCode is required" })
  @IsString({ message: "postCode must be a string" })
  @Length(5, 5, { message: "postCode must be exactly 5 characters" })
  postCode: string;
}