import socketIO from 'socket.io'
import { User } from '../../models'

// Services and emails templates imports
import { Mail, Crypto } from '../../services'
import { activation } from '../../emails'

export const updateEmail = {
  name: 'update-email',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    data,
    token
  }: any) => {
    const { email } = data
    if (!email || !token) {
      socket.emit('update-email', {
        error: {
          code: 405,
          message: 'Requête invalide'
        }
      })
    } else {
      if (await User.model.findOne({ email })) {
        socket.emit('update-email', {
          error: {
            code: 405,
            message: 'Cet email est déjà utilisée'
          }
        })
      } else {
        const user = await User.model.findOne({ token })
        if (!user) {
          socket.emit('update-email', {
            error: {
              code: 405,
              message: 'Token invalide'
            }
          })
        } else {
          // Set the new email and the token for the activation
          const activationToken = Crypto.getToken()
          user.activationToken = activationToken
          user.email = email
          user.activated = false
          user.token = null
          await user.save()
          if (Mail) {
            Mail.send({
              to: email,
              subject: activation.subject,
              html: activation.html(activationToken)
            })
              .then(() => {
                // deconnect the user
                socket.emit('logout')
              })
              .catch(error => {
                console.error(error)
              })
          } else {
            socket.emit('update-email', {
              error: {
                code: 500,
                message: "Les mails ne sont activés qu'en production"
              }
            })
          }
        }
      }
    }
  }
}
