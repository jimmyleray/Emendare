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
      const { data } = res
      io.emit('events/all', { data: data.events })
      io.emit('text/' + textID, { data: data.text })
      socket.emit('postAmend', { data: data.amend })
    } else {
      socket.emit('postAmend', res)
    }
  }
}
