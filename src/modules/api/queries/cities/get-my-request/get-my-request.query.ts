import { PaginationDto } from "@common/dtos/pagination.dto";
import { IQuery } from "@nestjs/cqrs";

export class GetMyRequestQuery implements IQuery {
  constructor(
    public readonly id: string,
    public readonly paginationDto: PaginationDto,
  ) {}
}
