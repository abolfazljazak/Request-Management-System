export class SignUpResponseDto {
  user: {
    id: string;
    username: string;
    postCode: string;
  };

  accessToken: string;
}
