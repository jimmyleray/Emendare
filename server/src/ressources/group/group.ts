import socketIO from 'socket.io'
import { Group } from '../../models'

export const group = {
  name: 'group',
  callback: ({
    io,
    socket,
    session
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
    session: any
  }) => async ({ data }: any) => {
    if (data.id === 'all') {
      const groups = await Group.model.find({ parent: null })
      if (groups) {
        socket.emit('group/all', { data: groups })
      } else {
        socket.emit('group/all', {
          error: { code: 405, message: "Oups, il y'a eu une erreur" }
        })
      }
    } else {
      const gettedGroup = await Group.model.findById(data.id)
      if (gettedGroup) {
        socket.emit('group/' + data.id, { data: gettedGroup })
      } else {
        socket.emit('group/' + data.id, {
          error: { code: 404, message: "Oups, ce groupe n'existe pas ou plus" }
        })
      }
    }
  }
}
