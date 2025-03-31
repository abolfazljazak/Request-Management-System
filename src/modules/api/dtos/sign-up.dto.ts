import { IsNotEmpty, IsString, Length, Matches, MinLength } from "class-validator";

export class SignUpDto {
  @IsNotEmpty({ message: "username is required" })
  @IsString({ message: "username must be a string" })
  @Length(5, 12, { message: "Username must be between 5 and 12 characters" })
  @Matches(/^[a-zA-Z0-9!@._]+$/, {
    message: "Username can only contain letters, numbers, and !@._",
  })
  username: string;

  @IsNotEmpty({ message: "password is required" })
  @IsString({ message: "password must be a string" })
  @MinLength(5, { message: "Password must be more than 8 characters" })
  @Matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message: "password must contain at least one uppercase letter and one number",
  })
  password: string;
}
