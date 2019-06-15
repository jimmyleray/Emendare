import socketIO from 'socket.io'
import { Amend } from '../../models'

export const upVoteAmend = {
  name: 'upVoteAmend',
  callback: ({
    io,
    socket
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
  }) => async ({ token, data }: any) => {
    try {
      const response = await Amend.upVoteAmend(data.id, token, io)
      socket.emit('upVoteAmend', response)
    } catch (error) {
      console.error(error)
    }
  }
}
