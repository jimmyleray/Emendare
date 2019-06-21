import { InputType, Field } from 'type-graphql'

@InputType()
export class PostTextInputs {
  @Field()
  name: string
  @Field()
  description: string
}
