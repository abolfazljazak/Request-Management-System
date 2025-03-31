import { UserRequestEntity } from "@modules/persistence/entities/user-request.entity";

export type TPagination = {
  totalCount: number;
  page: number;
  limit: number;
};

export type TGetMyRequestResponse = {
  pagination: TPagination;
  userRequests: UserRequestEntity[];
};
