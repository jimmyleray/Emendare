import socketIO from 'socket.io'
import { User } from '../../models'
import { IAmend, IText } from '../../interfaces'

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
      socket.emit('logout')
    } catch (error) {
      console.error(error)
    }
  }
}
