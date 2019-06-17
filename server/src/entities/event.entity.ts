import { Entity, Column, ObjectID, ObjectIdColumn, BaseEntity } from 'typeorm'

@Entity()
export class Event extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID

  @Column({ default: Date.now })
  created: Date

  @Column()
  target: {
    type: string
    id: string
  }

  constructor(type: string, targetId: string) {
    super()
    this.target = { type, id: targetId }
    this.created = new Date(Date.now())
  }
}
