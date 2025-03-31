import { BaseEntity } from "@common/abstracts/base.entity";
import { EntityNames } from "@common/enums/entity.enum";
import { Column, Entity } from "typeorm";

@Entity(EntityNames.User)
export class UserEntity extends BaseEntity {
  @Column({ unique: true, type: "varchar" })
  username: string;

  @Column({ type: "varchar" })
  password: string;
}
