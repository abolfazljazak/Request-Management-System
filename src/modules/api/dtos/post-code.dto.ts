import { IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PostCodeDto {
  @ApiProperty({
    description: "Post code of the city",
    example: "12345",
    minLength: 5,
    maxLength: 5,
    pattern: "^[0-9]{5}$"
  })
  @IsString({ message: "postCode must be a string" })
  @Length(5, 5, { message: "Password must be 5 characters" })
  postCode: string;
}
