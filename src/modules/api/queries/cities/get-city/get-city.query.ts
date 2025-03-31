import { IQuery } from "@nestjs/cqrs";

export class GetCityQuery implements IQuery {
  constructor(
    public readonly id: string,
    public readonly postCode: string,
  ) {}
}
