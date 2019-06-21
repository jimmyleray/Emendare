import { InputType, Field } from 'type-graphql'

@InputType()
export class PostAmendInputs {
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
