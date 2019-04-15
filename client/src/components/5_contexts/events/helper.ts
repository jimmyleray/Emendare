import { IEvent, IText, IUser } from '../../../../../interfaces'
import _ from 'lodash'

/**
 * Return an array of events which have not been readed by the user
 * @param lastEventDate Last event readed by the user
 * @param events List of aall the events
 */
export const getNewEvent = (lastEventDate: any, events: IEvent[]) => {
  return lastEventDate && events.length > 0
    ? events.filter(
        (event: any) =>
          new Date(event.created).getTime() > new Date(lastEventDate).getTime()
      )
    : []
}

/**
 * Delete the event which have been readed by the user from the list
 * @param eventId Id of the event
 * @param newEvents List of new Events
 */
export const deleteNewEvent = (eventId: string, newEvents: IEvent[]) => {
  if (eventId && newEvents.length > 0) {
    return _.remove(newEvents, (event: IEvent) => {
      return event._id !== eventId
    })
  }
  return newEvents
}
