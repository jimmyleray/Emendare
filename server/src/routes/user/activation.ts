import socketIO from 'socket.io'
import { User } from '../../models'

export const activation = {
  name: 'activation',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    data
  }: any) => {
    const activationToken = data.activationToken
    const user = await User.model.findOne({ activationToken })
    if (user) {
      if (!user.activated) {
        user.activated = true
        await user.save()
        socket.emit('activation')
      } else {
        socket.emit('activation', {
          error: { code: 405, message: 'Ce compte est déjà activé' }
        })
      }
    } else {
      socket.emit('activation', {
        error: { code: 405, message: 'Votre token est invalide' }
      })
    }
  }
}
