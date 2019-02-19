import SocketIO from 'socket.io'
import { User } from '../../models'

export const resetPassword = {
  name: 'reset-password',
  callback: ({ socket }: { socket: SocketIO.Socket }) => async ({
    data
  }: any) => {
    if (!data.email) {
      return {
        error: {
          code: 405,
          message: "L'email est requis."
        }
      }
    } else {
      socket.emit('reset-password', await User.resetPassword(data.email))
    }
  }
}
