import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Results {
  @Field()
  totalPotentialVotesCount: number
  @Field()
  upVotesCount: number
  @Field()
  downVotesCount: number
  @Field()
  indVotesCount: number

  constructor() {
    this.totalPotentialVotesCount = 0
    this.upVotesCount = 0
    this.downVotesCount = 0
    this.indVotesCount = 0
  }
}
