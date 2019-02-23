import socketIO from 'socket.io'
import { Amend } from '../../models'

export const postAmend = {
  name: 'postAmend',
  callback: ({
    io,
    socket
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
  }) => async ({ token, data }: any) => {
    const { name, description, patch, version, textID } = data
    const res = await Amend.postAmend(
      name,
      description,
      patch,
      version,
      textID,
      token
    )
    if ('data' in res) {
      io.emit('events/all', { data: res.data.events })
      io.emit('text/' + textID, { data: res.data.text })
      socket.emit('postAmend', { data: res.data.amend })
    } else {
      socket.emit('postAmend', res)
    }
  }
}
