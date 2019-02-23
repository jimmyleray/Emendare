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
      io.emit('events/all', { data: res.data.events })
      io.emit('texts/all', { data: res.data.texts })
      socket.emit('postText', { data: res.data.text })
    } else {
      socket.emit('postText', res)
    }
  }
}
