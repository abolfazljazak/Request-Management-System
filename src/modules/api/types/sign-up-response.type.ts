type TUser = {
  id: string;
  username: string;
};

export type TSignUpResponse = {
  user: TUser;
  accessToken: string;
};
