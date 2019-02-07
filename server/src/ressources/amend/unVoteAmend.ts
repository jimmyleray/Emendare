import socketIO from 'socket.io'
import { Amend, User } from '../../models'

export const unVoteAmend = {
  name: 'unVoteAmend',
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
      const amend = await Amend.model.findById(data.id)
      if (user.followedTexts.indexOf(amend.text) > -1) {
        if (!amend.closed) {
          const id1 = user.upVotes.indexOf(data.id)
          const id2 = user.downVotes.indexOf(data.id)
          const id3 = user.indVotes.indexOf(data.id)

          if (id1 > -1) {
            amend.upVotesCount--
            user.upVotes.splice(id1, 1)
          }

          if (id2 > -1) {
            amend.downVotesCount--
            user.downVotes.splice(id2, 1)
          }

          if (id3 > -1) {
            amend.indVotesCount--
            user.indVotes.splice(id3, 1)
          }

          await user.save()
          session.user = user

          await amend.save()

          io.emit('amend/' + amend._id, { data: amend })
          socket.emit('unVoteAmend', { data: amend })
        } else {
          socket.emit('unVoteAmend', {
            error: { code: 405, message: 'Ce scrutin est terminé' }
          })
        }
      } else {
        socket.emit('unVoteAmend', {
          error: {
            code: 405,
            message: 'Cet utilisateur ne participe pas à ce texte'
          }
        })
      }
    } else {
      socket.emit('unVoteAmend', {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      })
    }
  }
}
