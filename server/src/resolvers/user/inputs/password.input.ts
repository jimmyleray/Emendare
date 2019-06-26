import { InputType, Field } from 'type-graphql'
import { TokenInput } from '../../../common'

@InputType()
export class PasswordInput extends TokenInput {
  @Field()
  password: string
}
