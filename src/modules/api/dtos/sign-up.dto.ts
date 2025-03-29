import { IsString, Length } from "class-validator";

export class SignUpDto {
  @IsString()
  @Length(3, 50)
  username: string;

  @IsString()
  @Length(8, 100)
  password: string;

  @IsString()
  @Length(5, 5)
  postCode: string;
}
