import socketIO from 'socket.io'
import { User } from '../../models'

export const subscribe = {
  name: 'subscribe',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    data = {}
  }: any) => {
    try {
      const response = await User.subscribe(data.email, data.password)
      socket.emit('subscribe', response)
    } catch (error) {
      console.error(error)
    }
  }
}
