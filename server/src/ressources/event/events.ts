import socketIO from 'socket.io'
import { Event } from '../../models'

export const events = {
  name: 'events',
  callback: ({
    io,
    socket,
    session
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
    session: any
  }) => async () => {
    const gettedEvents = await Event.model.find().sort('-created')
    socket.emit('events/all', { data: gettedEvents })
  }
}
