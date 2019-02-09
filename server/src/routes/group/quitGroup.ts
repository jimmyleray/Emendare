import socketIO from 'socket.io'
import { Group, User } from '../../models'

export const quitGroup = {
  name: 'quitGroup',
  callback: ({
    io,
    socket
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
  }) => async ({ token, data }: any) => {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const id = user.followedGroups.indexOf(data.id)
      if (id >= 0) {
        user.followedGroups.splice(id, 1)
        await user.save()

        const group = await Group.model.findById(data.id)
        group.followersCount--
        await group.save()

        if (!group.parent) {
          const groups = await Group.model.find({ parent: null })
          io.emit('group/all', { data: groups })
        }

        io.emit('group/' + group._id, { data: group })
        socket.emit('quitGroup')
      } else {
        socket.emit('quitGroup', {
          error: { code: 405, message: "Ce groupe n'est pas suivi" }
        })
      }
    } else {
      socket.emit('quitGroup', {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      })
    }
  }
}
