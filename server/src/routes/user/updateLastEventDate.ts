import socketIO from 'socket.io'
import { User } from '../../models'

export const updateLastEventDate = {
  name: 'updateLastEventDate',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    token
  }: any) => {
    if (token) {
      const user = await User.model.findOne({ token })
      if (user) {
        user.lastEventDate = new Date()
        await user.save()
        socket.emit('user', { data: user })
        socket.emit('updateLastEventDate')
      } else {
        socket.emit('updateLastEventDate', {
          error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
        })
      }
    } else {
      socket.emit('updateLastEventDate', {
        error: { code: 405, message: 'Le token est invalide' }
      })
    }
  }
}
