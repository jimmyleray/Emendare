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
    try {
      const response = await Text.followText(data.id, token, io)
      socket.emit('followText', response)
    } catch (error) {
      console.error(error)
    }
  }
}
