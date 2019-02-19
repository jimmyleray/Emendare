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
    const res = await Amend.indVoteAmend(data.id, token)
    if ('data' in res) {
      io.emit('amend/' + data.id, res)
    }
    socket.emit('indVoteAmend', res)
  }
}
