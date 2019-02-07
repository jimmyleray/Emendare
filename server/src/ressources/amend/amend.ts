import socketIO from 'socket.io'
import { Amend } from '../../models'

export const amend = {
  name: 'amend',
  callback: ({
    io,
    socket,
    session
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
    session: any
  }) => async ({ data }: any) => {
    const gettedAmend = await Amend.model.findById(data.id)
    if (gettedAmend) {
      socket.emit('amend/' + data.id, { data: gettedAmend })
    } else {
      socket.emit('amend/' + data.id, {
        error: {
          code: 404,
          message: "Oups, cet amendement n'existe pas ou plus"
        }
      })
    }
  }
}
