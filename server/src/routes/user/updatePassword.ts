import socketIO from 'socket.io'
import { User } from '../../models'

// lib to hash passwords
import bcrypt from 'bcrypt'

export const updatePassword = {
  name: 'update-password',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    data,
    token
  }: any) => {
    if (!data.password || !token) {
      socket.emit('update-password', {
        error: {
          code: 405,
          message: 'Requête invalide'
        }
      })
    } else {
      const res = await User.updatePassword(data.password, token)
      if ('data' in res) {
        // send user updated
        socket.emit('user', res)
        socket.emit('update-password')
      } else if (res.error.message === 'Token invalide') {
        socket.emit('logout')
      } else {
        socket.emit('update-password', res)
      }
    }
  }
}
