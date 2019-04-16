import { IUser, INews, IEvent, IResponse } from '../../../../interfaces'
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
    return user.followedTexts.includes(textId)
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
): INews[] => {
  return events.map((event: IEvent) => {
    return {
      event,
      target: getEventTarget(event, get)
    }
  })
}

export const isTargetLoaded = (value: INews) => {
  return value.target && value.target.data
}

/**
 * Return true if all the target are loaded
 * @param events list of events and target
 */
export const areTargetLoaded = (events: INews[]): boolean => {
  if (events.length > 0) {
    return events.every(isTargetLoaded)
  }
  return false
}

/**
 * Return true if the event is related to the texts followed by the user
 * @param event Event object
 * @param target Target of the related event
 * @param user User object
 */
export const isRelatedToUserFollowedText = (user: IUser | null) => (
  value: INews
) => {
  if (
    user &&
    value.target &&
    (value.event.target.type === 'amend' ||
      value.event.target.type === 'result')
  ) {
    return isUserFollowText(user, value.target.data.text)
  }
  return true
}

/**
 * Filter the list of events depending on the texts followed by the user
 * @param events list of events and related target
 * @param user  User object
 */
export const filterEventsByUserTextFollowed = (
  events: INews[],
  user: IUser | null
) => {
  if (user && areTargetLoaded(events)) {
    return events.filter(isRelatedToUserFollowedText(user))
  }
  return events
}
