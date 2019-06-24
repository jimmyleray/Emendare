import { InputType, Field } from 'type-graphql'
import { TokenInput } from '../inputs'

@InputType()
export class IdInput extends TokenInput {
  @Field()
  id: string
}
