import socketIO from 'socket.io'
import { Text, Event, User } from '../../models'

export const postText = {
  name: 'postText',
  callback: ({
    io,
    socket
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
  }) => async ({ token, data }: any) => {
    const { name, description } = data
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const text = await new Text.model({
        description,
        name
      }).save()

      await new Event.model({
        targetID: text._id,
        targetType: 'text'
      }).save()

      const events = await Event.model.find().sort('-created')
      io.emit('events/all', { data: events })

      const texts = await Text.model.find({ rules: false })
      io.emit('texts/all', { data: texts })

      socket.emit('postText', { data: text })
    } else {
      socket.emit('postText', {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      })
    }
  }
}
