export type TSignUpResponse = {
    user: {
      id: string;
      username: string;
    };
    accessToken: string;
  };