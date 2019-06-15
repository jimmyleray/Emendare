import socketIO from 'socket.io'
import { User } from '../../models'

export const updateEmail = {
  name: 'update-email',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    data = {},
    token
  }: any) => {
    try {
      const response = await User.updateEmail(data.email, token)
      socket.emit('update-email', response)
    } catch (error) {
      console.error(error)
    }
  }
}
