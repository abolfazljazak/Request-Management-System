import { IsString, Length } from "class-validator";

export class PostCodeDto {
  @IsString({ message: "postCode must be a string" })
  @Length(5, 5, { message: "Password must be 5 characters" })
  postCode: string;
}
