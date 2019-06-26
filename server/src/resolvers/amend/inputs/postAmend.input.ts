import { Field, InputType } from 'type-graphql'
import { TokenInput } from '../../../common'

@InputType()
export class PostAmendInputs extends TokenInput {
  @Field()
  name: string
  @Field()
  description: string
  @Field()
  patch: string
  @Field()
  version: number
  @Field()
  textID: string
}
