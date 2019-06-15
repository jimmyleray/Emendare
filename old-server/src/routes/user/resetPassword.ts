import SocketIO from 'socket.io'
import { User } from '../../models'

export const resetPassword = {
  name: 'reset-password',
  callback: ({ socket }: { socket: SocketIO.Socket }) => async ({
    data = {}
  }: any) => {
    try {
      const response = await User.resetPassword(data)
      socket.emit('reset-password', response)
    } catch (error) {
      console.error(error)
    }
  }
}
