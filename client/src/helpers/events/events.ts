import { IEvent, IUser, IResponse } from '../../../../interfaces'
import _ from 'lodash'

/**
 * Return an array of events which have not been readed by the user
 * @param lastEventDate Last event readed by the user
 * @param events List of aall the events
 */
export const getNewEvent = (lastEventDate: any, events: IEvent[]) =>
  lastEventDate && events.length > 0
    ? events.filter(
        (event: any) =>
          new Date(event.created).getTime() > new Date(lastEventDate).getTime()
      )
    : []

/**
 * Delete the event which have been readed by the user from the list
 * @param eventId Id of the event
 * @param newEvents List of new Events
 */
export const deleteNewEvent = (eventId: string, newEvents: IEvent[]) => {
  if (eventId && newEvents.length > 0) {
    return _.remove(newEvents, event => event._id !== eventId)
  }
  return newEvents
}

/**
 * Return true if the user followed the text
 * @param user User object
 * @param text Text object
 */
export const isUserFollowText = (user: IUser | null, textId: string): boolean =>
  user ? user.followedTexts.includes(textId) : false

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
  return events.map(event => ({
    event,
    target: getEventTarget(event, get)
  }))
}

export const isTargetLoaded = (value: {
  event: IEvent
  target: IResponse<any> | undefined
}) => Boolean(value.target && value.target.data)

/**
 * Return true if all the target are loaded
 * @param events list of events and target
 */
export const areTargetLoaded = (
  events: Array<{ event: IEvent; target: IResponse<any> | undefined }>
): boolean => (events.length > 0 ? events.every(isTargetLoaded) : false)

export const filterEventsByUserTextFollowed = (
  events: Array<{ event: IEvent; target: IResponse<any> | undefined }>,
  user: IUser | null
) => {
  if (user && areTargetLoaded(events)) {
    return events.filter(({ event, target }) => {
      if (event.target.type === 'amend' || event.target.type === 'result') {
        return isUserFollowText(user, target!.data!.text)
      }
      return true
    })
  }
  return events
}
