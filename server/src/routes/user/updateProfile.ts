import socketIO from 'socket.io'
import { User } from '../../models'

// lib to hash passwords
import bcrypt from 'bcrypt'

export const updateProfil = {
  name,
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    data
  }: any) => {
    const { token, ...rest } = data
    if (!rest) {
      socket.emit('update-user', {
        error: {
          code: 405,
          message: "L'email et/ou le mot de passe sont requis"
        }
      })
    } else {
      let user = User.model.find({ token })
      if (!user) {
        socket.emit('update-user', {
          error: {
            code: 405,
            message: 'Token invalide'
          }
        })
      } else {
        for (const key in Object.keys(rest)) {
          if (key === 'password') {
            const hash = bcrypt.hashSync(rest[key], 10)
            user[key] = hash
          } else if (user[key]) {
            user[key] = rest[key]
          }
        }
        await user.save()
        // send the user updated
        socket.emit('user', { data: user })
      }
    }
  }
}
