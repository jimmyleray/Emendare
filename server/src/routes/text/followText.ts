import socketIO from 'socket.io'
import { Text } from '../../models'

export const followText = {
  name: 'followText',
  callback: ({
    io,
    socket
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
  }) => async ({ token, data }: any) => {
    const res = await Text.followText(data.id, token)
    if ('textId' in res) {
      io.emit('text/' + res.textId, { data: res.data })
      socket.emit('followText')
    } else {
      socket.emit('followText', res)
    }
  }
}
