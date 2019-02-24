import socketIO from 'socket.io'
import { Event } from '../../models'

export const events = {
  name: 'events',
  callback: ({ socket }: { socket: socketIO.Socket }) => async () => {
    try {
      const response = await Event.getEvents()
      socket.emit('events/all', response)
    } catch (error) {
      console.error(error)
    }
  }
}
