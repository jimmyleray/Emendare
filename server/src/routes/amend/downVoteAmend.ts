import socketIO from 'socket.io'
import { Amend, User } from '../../models'

export const downVoteAmend = {
  name: 'downVoteAmend',
  callback: ({
    io,
    socket
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
  }) => async ({ token, data }: any) => {
    const res = await Amend.downVoteAmend(data.id, token)
    if ('data' in res) {
      io.emit('amend/' + data.id, res)
    }
    socket.emit('downVoteAmend', res)
  }
}
