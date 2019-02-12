import SocketIO from 'socket.io'
import { User } from '../../models'

// Hash lib
import bcrypt from 'bcrypt'
// Services and emails templates import
import { Mail, Crypto } from '../../services'
import { reset } from '../../emails'

export const resetPassword = {
  name: 'reset-password',
  callback: ({ socket }: { socket: SocketIO.Socket }) => async ({
    data
  }: any) => {
    const { email } = data
    if (!email) {
      socket.emit('reset-password', {
        error: {
          code: 405,
          message: "L'email est requis."
        }
      })
    } else {
      let user = await User.model.findOne({ email })
      if (!user) {
        socket.emit('reset-password', {
          error: {
            code: 405,
            message: "Cet email n'existe pas."
          }
        })
      } else {
        // Generate a new Password
        const newPassword = Crypto.getToken(16)
        // Update the user password
        bcrypt.hash(newPassword, 10, async (err, hash) => {
          user.password = hash
          await user.save()

          if (Mail) {
            Mail.send({
              to: email,
              subject: 'Réinitialisation de votre mot de passe',
              html: reset(newPassword)
            })
              .then(() => {
                socket.emit('reset-password')
              })
              .catch((error: any) => {
                console.error(error)
                socket.emit('reset-password', {
                  error: {
                    code: 500,
                    message: "Erreur lors de l'envoie du mot du mail"
                  }
                })
              })
          } else {
            socket.emit('reset-password', {
              error: {
                code: 500,
                message: "Les mails ne sont activés qu'en production"
              }
            })
          }
        })
      }
    }
  }
}
