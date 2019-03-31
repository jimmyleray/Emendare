import { Entity, Column, ObjectID, ObjectIdColumn, BaseEntity } from 'typeorm'

@Entity()
export class Register extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  url: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  language: string

  @Column()
  users: number

  @Column()
  texts: number

  @Column()
  created: Date | string
}
