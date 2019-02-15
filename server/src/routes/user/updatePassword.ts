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
    const { password } = data
    if (!password || !token) {
      socket.emit('update-password', {
        error: {
          code: 405,
          message: 'Requête invalide'
        }
      })
    } else {
      const user = await User.model.findOne({ token })
      if (!user) {
        socket.emit('update-password', {
          error: {
            code: 405,
            message: 'Token invalide'
          }
        })
        socket.emit('logout')
      } else {
        bcrypt.hash(password, 10, async (error, hash) => {
          if (error) {
            console.error(error)
          } else {
            user.password = hash
            await user.save()
            // send the user updated
            socket.emit('user', { data: user })
            socket.emit('update-password')
          }
        })
      }
    }
  }
}
