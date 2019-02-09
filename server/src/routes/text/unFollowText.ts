import socketIO from 'socket.io'
import { Text, User } from '../../models'

export const unFollowText = {
  name: 'unFollowText',
  callback: ({
    io,
    socket
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
  }) => async ({ token, data }: any) => {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const id = user.followedTexts.indexOf(data.id)
      if (id >= 0) {
        user.followedTexts.splice(id, 1)
        await user.save()

        const text = await Text.model.findById(data.id)
        text.followersCount--
        await text.save()

        io.emit('text/' + text._id, { data: text })
        socket.emit('unFollowText')
      } else {
        socket.emit('unFollowText', {
          error: { code: 405, message: "Ce texte n'est pas suivi" }
        })
      }
    } else {
      socket.emit('unFollowText', {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      })
    }
  }
}
