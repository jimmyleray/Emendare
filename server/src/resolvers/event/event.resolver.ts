import { Event } from 'src/entities'
import { ObjectType, Query, Field } from 'type-graphql'
import { Response } from '../../common'
import { IResponse } from '../../../../interfaces'
import { Resolver, Args } from '@nestjs/graphql'
import { EventService } from 'src/services'
import { EventsInputs } from './inputs'

// Responses Type
@ObjectType()
class EventResponse extends Response(Event) {}
@ObjectType()
class DataFromGetEventsByGroup {
  @Field(type => [Event], { nullable: true })
  events: Event[] | null
  @Field()
  hasNextPage: boolean
}
@ObjectType()
class EventsResponse extends Response(Event) {
  @Field(type => DataFromGetEventsByGroup, { nullable: true })
  data: DataFromGetEventsByGroup | null
}

@Resolver()
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query(returns => EventResponse)
  async event(@Args('id') id: string): Promise<IResponse<Event>> {
    console.log(id)
    return await this.eventService.getEvent(id)
  }

  @Query(returns => EventsResponse)
  async events(
    @Args('data') data: EventsInputs
  ): Promise<IResponse<DataFromGetEventsByGroup>> {
    return this.eventService.getEventsByGroup(data.limit, data.lastEventDate)
  }
}
