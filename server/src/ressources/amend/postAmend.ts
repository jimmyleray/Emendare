import socketIO from 'socket.io'
import { Amend, Event, Text, User } from '../../models'

export const postAmend = {
  name: 'postAmend',
  callback: ({
    io,
    socket,
    session
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
    session: any
  }) => async ({ token, data }: any) => {
    const { name, description, patch, version, textID } = data
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const amend = await new Amend.model({
        description,
        name,
        patch,
        text: textID,
        version
      }).save()

      user.amends.push(amend._id)
      await user.save()
      session.user = user

      const text = await Text.model.findById(textID)
      text.amends.push(amend._id)
      await text.save()

      await new Event.model({
        targetID: amend._id,
        targetType: 'amend'
      }).save()

      const events = await Event.model.find().sort('-created')
      io.emit('events/all', { data: events })

      io.emit('text/' + text._id, { data: text })
      socket.emit('postAmend', { data: amend })
    } else {
      socket.emit('postAmend', {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      })
    }
  }
}
