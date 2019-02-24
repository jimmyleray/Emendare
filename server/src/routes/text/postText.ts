import socketIO from 'socket.io'
import { Text } from '../../models'

export const postText = {
  name: 'postText',
  callback: ({
    io,
    socket
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
  }) => async ({ token, data }: any) => {
    try {
      const response = await Text.postText(data, token, io)
      socket.emit('postText', response)
    } catch (error) {
      console.error(error)
    }
  }
}
