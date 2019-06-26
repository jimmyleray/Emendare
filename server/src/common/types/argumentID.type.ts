import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class ArgumentID {
  @Field()
  amendID: string
  @Field()
  argumentID: string

  constructor(amendID, argumentID) {
    this.amendID = amendID
    this.argumentID = argumentID
  }
}
