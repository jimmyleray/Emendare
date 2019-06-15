import socketIO from 'socket.io'
import { Amend } from '../../models'

export const unVoteAmend = {
  name: 'unVoteAmend',
  callback: ({
    io,
    socket
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
  }) => async ({ token, data }: any) => {
    try {
      const response = await Amend.unVoteAmend(data.id, token, io)
      socket.emit('unVoteAmend', response)
    } catch (error) {
      console.error(error)
    }
  }
}
