import socketIO from 'socket.io'
import { User } from '../../models'

export const user = {
  name: 'user',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    token
  }: any) => {
    if (token) {
      const gettedUser = await User.model.findOne({ token })
      if (gettedUser) {
        socket.emit('user', { data: gettedUser })
      } else {
        socket.emit('user', {
          error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
        })
      }
    } else {
      socket.emit('user', {
        error: { code: 405, message: 'Le token est invalide' }
      })
    }
  }
}
