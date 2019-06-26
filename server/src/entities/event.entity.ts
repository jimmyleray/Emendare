import { Entity, Column, ObjectID, ObjectIdColumn, BaseEntity } from 'typeorm'
import { ObjectType, ID, Field } from 'type-graphql'
import { Target } from '../common'

@ObjectType()
@Entity()
export class Event extends BaseEntity {
  @Field(type => ID)
  @ObjectIdColumn()
  id: ObjectID

  @Field()
  @Column({ default: new Date(Date.now()) })
  created: Date

  @Field(type => Target)
  @Column()
  target: Target

  constructor(type: string, targetId: string) {
    super()
    this.target = new Target(type, targetId)
    this.created = new Date(Date.now())
  }
}
