import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export class TokenArgs {
  @Field()
  token: string
}
