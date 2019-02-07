import socketIO from 'socket.io'
import { Amend, User } from '../../models'

export const indVoteAmend = {
  name: 'indVoteAmend',
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
          if (user.indVotes.indexOf(data.id) === -1) {
            const id1 = user.upVotes.indexOf(data.id)
            if (id1 > -1) {
              amend.upVotesCount--
              user.upVotes.splice(id1, 1)
            }

            const id2 = user.downVotes.indexOf(data.id)
            if (id2 > -1) {
              amend.downVotesCount--
              user.downVotes.splice(id2, 1)
            }

            amend.indVotesCount++
            user.indVotes.push(data.id)

            await user.save()
            session.user = user

            await amend.save()

            io.emit('amend/' + amend._id, { data: amend })
            socket.emit('indVoteAmend', { data: amend })
          } else {
            socket.emit('indVoteAmend', {
              error: { code: 405, message: 'Vous avez déjà voté indifférent' }
            })
          }
        } else {
          socket.emit('indVoteAmend', {
            error: { code: 405, message: 'Ce scrutin est terminé' }
          })
        }
      } else {
        socket.emit('indVoteAmend', {
          error: {
            code: 405,
            message: 'Cet utilisateur ne participe pas au texte'
          }
        })
      }
    } else {
      socket.emit('indVoteAmend', {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      })
    }
  }
}
