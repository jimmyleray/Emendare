import socketIO from 'socket.io'
import { Group } from '../../models'

export const group = {
  name: 'group',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    data
  }: any) => {
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
