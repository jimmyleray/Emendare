import socketIO from 'socket.io'
import { Amend } from '../../models'

export const indVoteAmend = {
  name: 'indVoteAmend',
  callback: ({
    io,
    socket
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
  }) => async ({ token, data }: any) => {
    try {
      const response = await Amend.indVoteAmend(data.id, token, io)
      socket.emit('indVoteAmend', response)
    } catch (error) {
      console.error(error)
    }
  }
}
