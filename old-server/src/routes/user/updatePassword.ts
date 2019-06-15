import socketIO from 'socket.io'
import { User } from '../../models'

export const updatePassword = {
  name: 'update-password',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    data,
    token
  }: any) => {
    try {
      const response = await User.updatePassword(data.password, token)
      socket.emit('update-password', response)
    } catch (error) {
      console.error(error)
    }
  }
}
