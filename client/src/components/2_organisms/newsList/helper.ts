import { IEvent, IResponse } from '../../../../../interfaces'
import { Socket } from '../../../services'
import { last } from 'lodash'

/**
 * Tell if the row is loaded
 * @param data List of events we want to render
 * @param index Index of the row
 */
export const isRowLoaded = (
  data: Array<{ event: IEvent; target: IResponse<any> }>
) => ({ index }: any) => !!data[index]

/**
 * Fetch data from a API
 * @param data List of events we want to render
 */
export const loadMoreRows = (
  data: Array<{ event: IEvent; target: IResponse<any> }>,
  hasNextPage: boolean
) => async () => {
  if (hasNextPage) {
    Socket.emit('events', {
      lastEventDate: last(data)!.event.created
    })
  }
}

/**
 * Tell if the event has not been readed by the user
 * @param newEvents List of new events
 * @param events  List of events
 * @param index Current row index
 */
export const isEventNew = (
  newEvents: IEvent[],
  events: Array<{ event: IEvent; target: IResponse<any> }>,
  index: number
) =>
  newEvents.length > 0 && events.length > 0
    ? newEvents.map(event => event._id).includes(events[index].event._id)
    : false
