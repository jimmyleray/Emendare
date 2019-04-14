import { IEvent } from '../../../../../interfaces'
import { Socket } from '../../../services'
import { last } from 'lodash'

/**
 * Tell if the row is loaded
 * @param data List of events we want to render
 * @param index Index of the row
 */
export const isRowLoaded = (data: IEvent[]) => ({ index }: any) => !!data[index]

/**
 * Fetch data from a API
 * @param data List of events we want to render
 * @param stopIndex Index of the last rendered row
 * @param limit Number of data we want to fetch
 * @param socket Current socket of the client
 */
export const loadMoreRows = (
  data: IEvent[],
  hasNextPage: boolean,
  limit: number = 10
) => () =>
  new Promise(resolve => {
    if (hasNextPage) {
      Socket.emit('events', {
        limit,
        lastEventDate: last(data)!.created
      })
      Socket.on('events', resolve)
    } else {
      resolve()
    }
  })

/**
 * Tell if the event has not been readed by the user
 * @param newEvents List of new events
 * @param events  List of events
 * @param index Current row index
 */
export const isEventNew = (
  newEvents: IEvent[],
  events: IEvent[],
  index: number
) =>
  newEvents.length > 0 && events.length > 0
    ? newEvents.map(event => event._id).includes(events[index]._id)
    : false
