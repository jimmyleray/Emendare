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
    const res = await Amend.upVoteAmend(data.id, token)
    if ('data' in res) {
      io.emit('amend/' + data.id, res)
    }
    socket.emit('upVoteAmend', res)
  }
}
