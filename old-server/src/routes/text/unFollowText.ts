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
    try {
      const response = await Text.unFollowText(data.id, token, io)
      socket.emit('unFollowText', response)
    } catch (error) {
      console.error(error)
    }
  }
}
