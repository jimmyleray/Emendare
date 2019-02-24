import socketIO from 'socket.io'
import { Amend } from '../../models'

export const downVoteAmend = {
  name: 'downVoteAmend',
  callback: ({
    io,
    socket
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
  }) => async ({ token, data }: any) => {
    try {
      const response = await Amend.downVoteAmend(data.id, token, io)
      socket.emit('downVoteAmend', response)
    } catch (error) {
      console.error(error)
    }
  }
}
