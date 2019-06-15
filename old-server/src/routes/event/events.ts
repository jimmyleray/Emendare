import socketIO from 'socket.io'
import { Event } from '../../models'

export const events = {
  name: 'events',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    data
  }: any) => {
    try {
      const response = await Event.getEventsByGroup(
        data.limit,
        data.lastEventDate
      )
      socket.emit('events', response)
    } catch (error) {
      console.error(error)
    }
  }
}
