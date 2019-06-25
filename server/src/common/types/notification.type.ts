import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Notification {
  @Field()
  newText: boolean
  @Field()
  newAmend: boolean
  @Field()
  amendAccepted: boolean
  @Field()
  amendRefused: boolean

  constructor() {
    this.newText = true
    this.newAmend = true
    this.amendAccepted = true
    this.amendRefused = true
  }
}
