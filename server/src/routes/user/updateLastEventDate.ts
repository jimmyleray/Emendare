import socketIO from 'socket.io'
import { User } from '../../models'

export const updateLastEventDate = {
  name: 'updateLastEventDate',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    token
  }: any) => {
    try {
      const response = await User.updateLastEventDate(token)
      socket.emit('updateLastEventDate', response)
      socket.emit('user', response)
    } catch (error) {
      console.error(error)
    }
  }
}
