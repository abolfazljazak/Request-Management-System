import { BaseEntity } from "@common/abstracts/base.entity";
import { EntityNames } from "@common/enums/entity.enum";
import { Column, Entity } from "typeorm";

@Entity(EntityNames.UserRequest)
export class UserRequestEntity extends BaseEntity {
  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  requestType: string;

  @Column({ nullable: true })
  postCode: string;

  @Column({ type: 'json', nullable: true })
  responseData: {
    postCode: string;
    country: string;
    places: {
      placeName: string;
      state: string;
      abbreviation: string;
    }[];
  };
}
