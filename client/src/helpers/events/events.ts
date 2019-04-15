import { IEvent, IUser, IResponse } from '../../../../interfaces'
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

/**
 * Return true if the user followed the text
 * @param user User object
 * @param text Text object
 */
export const isUserFollowText = (
  user: IUser | null,
  textId: string
): boolean => {
  if (user) {
    return user.followedTexts.find((text: string) => text === textId) === textId
  }
  return false
}

/**
 * Get the target related of the event
 * @param event Event object
 * @param get function to get the data from the dataProvider
 */
export const getEventTarget = (
  event: IEvent,
  get: (type: string) => any
): IResponse<any> | undefined => {
  const eventType = event.target.type === 'result' ? 'amend' : event.target.type
  return get(eventType)(event.target.id)
}

/**
 * Return the list of events and the related target
 * @param events List of events
 * @param get function to get the data from the dataProvider
 */
export const getListTargets = (
  events: IEvent[],
  get: (type: string) => any
): Array<{ event: IEvent; target: IResponse<any> | undefined }> => {
  return events.map((event: IEvent) => {
    return {
      event,
      target: getEventTarget(event, get)
    }
  })
}

/**
 * Return true if all the target are loaded
 * @param events list of events and target
 */
export const areTargetLoaded = (
  events: Array<{ event: IEvent; target: IResponse<any> | undefined }>
): boolean => {
  if (events.length > 0) {
    return (
      events.filter(
        (val: { event: IEvent; target: IResponse<any> | undefined }) =>
          val.target && val.target.data
      ).length === events.length
    )
  }
  return false
}

export const filterEventsByUserTextFollowed = (
  events: Array<{ event: IEvent; target: IResponse<any> | undefined }>,
  user: IUser | null
) => {
  if (areTargetLoaded(events) && user) {
    return events.filter((val: { event: IEvent; target: any }) => {
      if (
        val.event.target.type === 'amend' ||
        val.event.target.type === 'result'
      ) {
        return isUserFollowText(user, val.target.data.text)
      }
      return true
    })
  }
  return events
}
