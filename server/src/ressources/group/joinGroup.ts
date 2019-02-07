import socketIO from 'socket.io'
import { Group, User } from '../../models'

export const joinGroup = {
  name: 'joinGroup',
  callback: ({
    io,
    socket,
    session
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
    session: any
  }) => async ({ token, data }: any) => {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      if (user.followedGroups.indexOf(data.id) === -1) {
        user.followedGroups.push(data.id)
        await user.save()
        session.user = user

        const group = await Group.model.findById(data.id)
        group.followersCount++
        await group.save()

        if (!group.parent) {
          const groups = await Group.model.find({ parent: null })
          io.emit('group/all', { data: groups })
        }

        io.emit('group/' + group._id, { data: group })
        socket.emit('joinGroup')
      } else {
        socket.emit('joinGroup', {
          error: { code: 405, message: 'Vous participez déjà à ce groupe' }
        })
      }
    } else {
      socket.emit('joinGroup', {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      })
    }
  }
}
