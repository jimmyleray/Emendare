import socketIO from 'socket.io'
import { User } from '../../models'

export const logout = {
  name: 'logout',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    token
  }: any) => {
    socket.emit('logout', await User.logout(token))
  }
}
