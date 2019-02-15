import socketIO from 'socket.io'
import { User } from '../../models'
import { Crypto } from '../../services'

// Lib to hash passwords
import bcrypt from 'bcrypt'

export const login = {
  name: 'login',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    token,
    data
  }: any) => {
    const { email, password } = data
    if (email && password) {
      const user = await User.model.findOne({ email })
      if (user) {
        if (user.activated) {
          bcrypt.compare(password, user.password, async (err, valid) => {
            if (valid) {
              user.token = Crypto.getToken()
              await user.save()
              socket.emit('login', { data: user })
            } else {
              socket.emit('login', {
                error: { code: 405, message: 'Le mot de passe est invalide' }
              })
            }
          })
        } else {
          socket.emit('login', {
            error: { code: 405, message: "Votre compte n'est pas activé" }
          })
        }
      } else {
        socket.emit('login', {
          error: { code: 405, message: "L'email est invalide" }
        })
      }
    } else if (token) {
      const user = await User.model.findOne({ token })
      if (user) {
        socket.emit('login', { data: user })
      } else {
        socket.emit('login', {
          error: { code: 405, message: 'Le token est invalide' }
        })
        socket.emit('logout')
      }
    } else {
      socket.emit('login', {
        error: { code: 405, message: 'La requete est invalide' }
      })
    }
  }
}
