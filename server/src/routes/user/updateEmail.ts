import socketIO from 'socket.io'
import { User } from '../../models'

export const updateEmail = {
  name: 'update-email',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    data,
    token
  }: any) => {
    if (!data.email || !token) {
      return {
        error: {
          code: 405,
          message: 'Requête invalide'
        }
      }
    } else {
      const res = await User.updateEmail(data.email, token)
      if (!res || res.error.message === 'Token invalide') {
        socket.emit('logout')
      } else {
        socket.emit('update-email', res)
      }
    }
  }
}
