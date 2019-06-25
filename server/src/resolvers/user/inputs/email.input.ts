import { ArgsType, Field, InputType } from 'type-graphql'
import { TokenArgs, TokenInput } from 'src/common'

@ArgsType()
export class EmailArgs extends TokenArgs {
  @Field()
  email: string
}

@InputType()
export class EmailInput extends TokenInput {
  @Field()
  email: string
}
