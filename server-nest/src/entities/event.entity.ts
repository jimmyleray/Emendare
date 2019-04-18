import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm'
import { Amend } from '../entities'

@Entity()
export class Event {
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
    this.target.type = type
    this.target.id = targetId
  }
}
