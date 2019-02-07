import socketIO from 'socket.io'
import { User } from '../../models'
import { isUndefined } from 'lodash'

export const toggleNotificationSetting = {
  name: 'toggleNotificationSetting',
  callback: ({
    io,
    socket,
    session
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
    session: any
  }) => async ({ token, data }: any) => {
    if (token) {
      const user = await User.model.findOne({ token })
      if (user) {
        if (!isUndefined(user.notifications[data.key])) {
          user.notifications[data.key] = !user.notifications[data.key]
          await user.save()
          session.user = user
          socket.emit('toggleNotificationSetting')
          socket.emit('user', { data: user })
        } else {
          socket.emit('toggleNotificationSetting', {
            error: { code: 405, message: 'Cette clé de requête est invalide' }
          })
        }
      } else {
        socket.emit('toggleNotificationSetting', {
          error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
        })
      }
    } else {
      socket.emit('toggleNotificationSetting', {
        error: { code: 405, message: 'Le token est invalide' }
      })
    }
  }
}
