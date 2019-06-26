import { InputType, Field, ArgsType } from 'type-graphql'
import { TokenArgs } from '../../../common'

@InputType()
export class UserInputs {
  @Field()
  email: string
  @Field()
  password: string
}

@ArgsType()
export class UserArgs extends TokenArgs {
  @Field()
  email: string
  @Field()
  password: string
}
