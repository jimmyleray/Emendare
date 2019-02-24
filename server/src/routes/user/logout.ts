import socketIO from 'socket.io'
import { User } from '../../models'

export const logout = {
  name: 'logout',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    token
  }: any) => {
    try {
      const response = await User.logout(token)
      socket.emit('logout', response)
    } catch (error) {
      console.error(error)
    }
  }
}
