import { InputType, Field } from 'type-graphql'
import { TokenInput } from '../../../common'

@InputType()
export class PostTextInputs extends TokenInput {
  @Field()
  name: string
  @Field()
  description: string
}
