import socketIO from 'socket.io'
import { User } from '../../models'

export const user = {
  name: 'user',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    token
  }: any) => {
    if (token) {
      try {
        const data = await User.model.findOne({ token })
        if (data) {
          socket.emit('user', { data })
        } else {
          socket.emit('user', {
            error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
          })
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      socket.emit('user', {
        error: { code: 405, message: 'Le token est invalide' }
      })
    }
  }
}
