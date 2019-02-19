import socketIO from 'socket.io'
import { Text, Event, User } from '../../models'

export const postText = {
  name: 'postText',
  callback: ({
    io,
    socket
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
  }) => async ({ token, data }: any) => {
    const res = await Text.postText(data.name, data.description, token)
    if ('data' in res) {
      const { data } = res
      io.emit('events/all', { data: data.events })
      io.emit('texts/all', { data: data.texts })
      socket.emit('postText', { data: data.text })
    } else {
      socket.emit('postText', res)
    }
  }
}
