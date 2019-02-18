import socketIO from 'socket.io'
import { Text } from '../../models'

export const unFollowText = {
  name: 'unFollowText',
  callback: ({
    io,
    socket
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
  }) => async ({ token, data }: any) => {
    const res = await Text.unFollowText(data.id, token)
    if ('data' in res) {
      io.emit('text/' + data.id, res)
      socket.emit('unFollowText')
    } else {
      socket.emit('unFollowText', res)
    }
  }
}
