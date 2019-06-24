import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Target {
  @Field()
  type: string
  @Field()
  id: string

  constructor(type: string, id: string) {
    this.type = type
    this.id = id
  }
}
