import socketIO from 'socket.io'
import { Amend } from '../../models'

export const postAmend = {
  name: 'postAmend',
  callback: ({
    io,
    socket
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
  }) => async ({ token, data }: any) => {
    try {
      const response = await Amend.postAmend(data, token, io)
      socket.emit('postAmend', response)
    } catch (error) {
      console.error(error)
    }
  }
}
