import socketIO from 'socket.io'
import { User } from '../../models'
import { Auth } from '../../services'

export const user = {
  name: 'user',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    token
  }: any) => {
    if (token && Auth.isTokenValid(token)) {
      if (!Auth.isTokenExpired(token)) {
        try {
          const { id } = Auth.decodeToken(token)
          const data = await User.model.findById(id)
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
          error: { code: 405, message: 'Le token est expiré' }
        })
      }
    } else {
      socket.emit('user', {
        error: { code: 405, message: 'Le token est invalide' }
      })
    }
  }
}
