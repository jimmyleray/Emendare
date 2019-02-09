import socketIO from 'socket.io'
import { Group } from '../../models'

export const groups = {
  name: 'groups',
  callback: ({ socket }: { socket: socketIO.Socket }) => async () => {
    const gettedGroups = await Group.model.find({ parent: null })
    if (gettedGroups) {
      socket.emit('groups/all', { data: gettedGroups })
    } else {
      socket.emit('groups/all', {
        error: { code: 405, message: "Oups, il y'a eu une erreur" }
      })
    }
  }
}
