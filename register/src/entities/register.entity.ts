import { Entity, Column, ObjectID, ObjectIdColumn, BaseEntity } from 'typeorm'

@Entity()
export class Register extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  url: string
}
