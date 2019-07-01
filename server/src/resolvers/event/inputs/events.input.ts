import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export class EventsArgs {
  @Field(type => Int, { nullable: true })
  limit?: number
  @Field({ nullable: true })
  lastEventDate?: string
}
