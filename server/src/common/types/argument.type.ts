import { Field, ObjectType, ID } from 'type-graphql'
import { ObjectID } from 'mongodb'

@ObjectType()
export class Argument {
  @Field(type => ID)
  id: ObjectID
  @Field()
  created: Date
  @Field()
  text: string
  @Field()
  type: string
  @Field()
  upVotesCount: number

  constructor(text, type) {
    const date = new Date(Date.now())
    this.text = text
    this.type = type
    this.upVotesCount = 0
    this.id = new ObjectID(date.getTime())
    this.created = date
  }
}
