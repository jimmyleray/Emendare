import socketIO from 'socket.io'
import { User } from '../../models'

export const toggleNotificationSetting = {
  name: 'toggleNotificationSetting',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    token,
    data
  }: any) => {
    if (token) {
      const res = User.toggleNotificationSetting(data.key, token)
      if ('data' in res) {
        socket.emit('user', res)
        socket.emit('toggleNotificationSetting')
      } else {
        socket.emit('toggleNotificationSetting', res)
      }
    } else {
      socket.emit('toggleNotificationSetting', {
        error: { code: 405, message: 'Le token est invalide' }
      })
    }
  }
}
