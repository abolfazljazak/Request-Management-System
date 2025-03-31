import { IQuery } from "@nestjs/cqrs";

export class GetMyRequestQuery implements IQuery {
  constructor(public readonly id: string) {}
}
