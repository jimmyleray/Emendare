import { InputType, Field } from 'type-graphql'
import { TokenInput } from '../../../common'

@InputType()
export class NotificationInput extends TokenInput {
  @Field()
  key: string
}
