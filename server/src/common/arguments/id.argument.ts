import { ArgsType, Field } from 'type-graphql'
import { TokenArgs } from './token.argument'

@ArgsType()
export class IdArg extends TokenArgs {
  @Field()
  id: string
}
