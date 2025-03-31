export type TSignUpResponse = {
    user: TUser;
    accessToken: string;
  };
  
type TUser = {
    id: string;
    username: string;
}