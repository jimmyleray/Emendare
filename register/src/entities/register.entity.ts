import { Entity, Column, ObjectID, ObjectIdColumn, BaseEntity } from 'typeorm'

@Entity()
export class Register extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  url: string
}
