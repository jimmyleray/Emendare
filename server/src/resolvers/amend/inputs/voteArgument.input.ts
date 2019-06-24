import { InputType, Field } from 'type-graphql'

@InputType()
export class VoteArgumentInputs {
  @Field()
  amendID: string
  @Field()
  argumentID: string
}
