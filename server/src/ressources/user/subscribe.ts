import socketIO from 'socket.io'
import { User } from '../../models'

// Lib to hash passwords
import bcrypt from 'bcrypt'

// Services and emails templates imports
import { Crypto, Mailer } from '../../services'
import { activation } from '../../emails'

// Create Mailer instance only for production
const Mail = process.env.NODE_ENV === 'production' ? new Mailer() : null

export const subscribe = {
  name: 'subscribe',
  callback: ({
    io,
    socket,
    session
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
    session: any
  }) => async ({ data }: any) => {
    const { email, password } = data
    if (!email) {
      socket.emit('subscribe', {
        error: {
          code: 405,
          message: "L'email est requis"
        }
      })
    } else {
      if (await User.model.findOne({ email })) {
        socket.emit('subscribe', {
          error: {
            code: 405,
            message:
              "Cet email est déjà utilisé. Si il s'agit de votre compte, essayez de vous y connecter directement."
          }
        })
      } else {
        if (!password) {
          socket.emit('subscribe', {
            error: { code: 405, message: 'Le mot de passe est requis' }
          })
        } else {
          bcrypt.hash(password, 10, async (err, hash) => {
            const activationToken = Crypto.getToken()
            await new User.model({
              email,
              password: hash,
              activationToken
            }).save()

            if (Mail) {
              Mail.send({
                to: email,
                subject: 'Activation de votre compte Emendare',
                html: activation(activationToken)
              })
                .then(() => {
                  socket.emit('subscribe')
                })
                .catch(error => {
                  console.error(error)
                  socket.emit('subscribe', {
                    error: { code: 500, message: "Erreur dans l'envoi du mail" }
                  })
                })
            } else {
              socket.emit('subscribe', {
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
}
