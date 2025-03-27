import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enums/entity.enum";
import { Column, Entity } from "typeorm";

@Entity(EntityNames.User)
export class UserEntity extends BaseEntity {
  @Column({ unique: true, type: "varchar" })
  username: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar" })
  postCode: string;
}
