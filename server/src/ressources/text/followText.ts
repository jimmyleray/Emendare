import socketIO from 'socket.io'
import { Text, User } from '../../models'

export const followText = {
  name: 'followText',
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
      if (user.followedTexts.indexOf(data.id) === -1) {
        user.followedTexts.push(data.id)
        await user.save()
        session.user = user

        const text = await Text.model.findById(data.id)
        text.followersCount++
        await text.save()

        io.emit('text/' + text._id, { data: text })
        socket.emit('followText')
      } else {
        socket.emit('followText', {
          error: { code: 405, message: 'Vous participez déjà à ce texte' }
        })
      }
    } else {
      socket.emit('followText', {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      })
    }
  }
}
