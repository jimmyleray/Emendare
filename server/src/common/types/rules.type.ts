import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Rules {
  @Field()
  delayMax: number

  constructor(delayMax) {
    this.delayMax = delayMax
  }
}
