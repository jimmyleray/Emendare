import { InputType, Field, Int } from 'type-graphql'

@InputType()
export class EventsInputs {
  @Field(type => Int)
  limit?: number
  @Field()
  lastEventDate: string
}
