import socketIO from 'socket.io'
import { User } from '../../models'

export const toggleNotificationSetting = {
  name: 'toggleNotificationSetting',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    token,
    data = {}
  }: any) => {
    try {
      const response = User.toggleNotificationSetting(data.key, token)
      socket.emit('toggleNotificationSetting', response)
      socket.emit('user', response)
    } catch (error) {
      console.error(error)
    }
  }
}
