import socketIO from 'socket.io'
import { Group, Event, User } from '../../models'

export const postGroup = {
  name: 'postGroup',
  callback: ({
    io,
    socket,
    session
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
    session: any
  }) => async ({ token, data }: any) => {
    const { name, description, whitelist, color } = data
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const group = await new Group.model({
        description,
        name,
        whitelist,
        color
      }).save()

      await new Event.model({
        targetID: group._id,
        targetType: 'group'
      }).save()

      const events = await Event.model.find().sort('-created')
      io.emit('events/all', { data: events })

      const groups = await Group.model.find({ parent: null })
      io.emit('group/all', { data: groups })

      socket.emit('postGroup', { data: group })
    } else {
      socket.emit('postGroup', {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      })
    }
  }
}
