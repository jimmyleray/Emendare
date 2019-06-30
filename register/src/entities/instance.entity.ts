import { Entity, Column, ObjectID, ObjectIdColumn, BaseEntity } from 'typeorm'

@Entity()
export class Instance extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  instanceUrl: string

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
  private: boolean

  @Column()
  sharedSecret: string

  @Column({ default: new Date(Date.now()) })
  created: Date | string
}
