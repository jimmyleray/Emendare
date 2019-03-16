import socketIO from 'socket.io'
import { User } from '../../models'

export const deleteAccount = {
  name: 'deleteAccount',
  callback: ({
    io,
    socket
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
  }) => async ({ token }: any) => {
    try {
      const response = await User.delete(token, io)
      socket.emit('deleteAccount', response)
    } catch (error) {
      console.error(error)
    }
  }
}
