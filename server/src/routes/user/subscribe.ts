import socketIO from 'socket.io'
import { User } from '../../models'

export const subscribe = {
  name: 'subscribe',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    data
  }: any) => {
    if (!data.email) {
      return {
        error: {
          code: 405,
          message: "L'email est requis"
        }
      }
    } else if (!data.password) {
      return {
        error: { code: 405, message: 'Le mot de passe est requis' }
      }
    } else {
      socket.emit('subscribe', await User.subscribe(data.email, data.password))
    }
  }
}
