import socketIO from 'socket.io'
import { Event } from '../../models'

export const event = {
  name: 'event',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    data
  }: any) => {
    try {
      const response = await Event.getEvent(data.id)
      socket.emit('event', response)
    } catch (error) {
      console.error(error)
    }
  }
}
