import socketIO from 'socket.io'
import { User } from '../../models'
import { IAmend, IText } from '../../interfaces'

export const deleteAccount = {
  name: 'deleteAccount',
  callback: ({
    io,
    socket
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
  }) => async ({ token }: any) => {
    const res = await User.delete(token)
    if ('data' in res) {
      // update texts and amends
      res.data.texts.forEach((text: IText) => {
        io.emit('text/' + text._id, { data: text })
      })
      res.data.amends.forEach((amend: IAmend) => {
        io.emit('amend/' + amend._id, { data: amend })
      })
      // logout user
      socket.emit('logout')
    }
    socket.emit('deleteAccount', res)
  }
}
