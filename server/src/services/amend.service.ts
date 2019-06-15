import { Inject, Injectable } from '@nestjs/common'
// Interfaces
import { IResponse } from '../../../interfaces'
// Services
import { Auth, TextService, Crypto } from '../services'
// Entities
import { Text, User, Event, Amend } from '../entities'
// Diff Patch Library
import { delay, findIndex } from 'lodash'
import { Server } from 'socket.io'
import { ObjectID } from 'mongodb'

@Injectable()
export class AmendService {
  constructor(
    @Inject('TextService') private readonly textService: TextService,
    @Inject('Auth')
    private readonly auth: Auth,
    @Inject('Crypto')
    private readonly crypto: Crypto
  ) {}

  async getAmend(id: string): Promise<IResponse<Amend>> {
    const data: Amend = await Amend.findOne(id)
    return data
      ? { data }
      : {
          error: {
            code: 404,
            message: "Oups, cet amendement n'existe pas ou plus"
          }
        }
  }

  static hasAbsoluteUpMajority(amend: any) {
    return (
      amend.results.upVotesCount > amend.results.indVotesCount &&
      amend.results.upVotesCount + amend.results.indVotesCount >=
        Math.floor(amend.text.followersCount / 2) + 1
    )
  }

  static hasAbsoluteDownMajority(amend: any) {
    return (
      amend.results.downVotesCount > amend.results.indVotesCount &&
      amend.results.downVotesCount + amend.results.indVotesCount >=
        Math.floor(amend.text.followersCount / 2) + 1
    )
  }

  static hasAbsoluteMajority(amend: any) {
    return (
      this.hasAbsoluteUpMajority(amend) || this.hasAbsoluteDownMajority(amend)
    )
  }

  static hasRelativeUpMajority(amend: any) {
    return amend.results.upVotesCount > amend.results.downVotesCount
  }

  async downVoteAmend(
    id: string,
    token: string,
    io?: Server
  ): Promise<IResponse<Amend>> {
    if (!this.auth.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    if (this.auth.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Token expiré' }
      }
    }
    const user: User = await User.findOne(this.auth.decodeToken(token).id)
    if (user && user.activated) {
      const amend: Amend = await Amend.findOne(id)
      if (user.followedTexts.indexOf(amend.text.toString()) > -1) {
        if (!amend.closed) {
          if (user.downVotes.indexOf(id) === -1) {
            const id1 = user.upVotes.indexOf(id)
            if (id1 > -1) {
              amend.results.upVotesCount--
              user.upVotes.splice(id1, 1)
            }

            const id2 = user.indVotes.indexOf(id)
            if (id2 > -1) {
              amend.results.indVotesCount--
              user.indVotes.splice(id2, 1)
            }

            amend.results.downVotesCount++
            user.downVotes.push(id)

            await user.save()
            await amend.save()

            if (io) {
              io.emit('amend/' + id, { data: amend })
            }

            return { data: amend }
          } else {
            return {
              error: { code: 405, message: 'Vous avez déjà voté contre' }
            }
          }
        } else {
          return {
            error: { code: 405, message: 'Ce scrutin est terminé' }
          }
        }
      } else {
        return {
          error: {
            code: 405,
            message: 'Cet utilisateur ne participe pas au texte'
          }
        }
      }
    } else {
      return {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      }
    }
  }

  async indVoteAmend(
    id: string,
    token: string,
    io?: Server
  ): Promise<IResponse<Amend>> {
    if (!this.auth.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    if (this.auth.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Token expiré' }
      }
    }
    const user: User = await User.findOne(this.auth.decodeToken(token).id)
    if (user && user.activated) {
      const amend: Amend = await Amend.findOne(id)
      if (user.followedTexts.indexOf(amend.text.toString()) > -1) {
        if (!amend.closed) {
          if (user.indVotes.indexOf(id) === -1) {
            const id1 = user.upVotes.indexOf(id)
            if (id1 > -1) {
              amend.results.upVotesCount--
              user.upVotes.splice(id1, 1)
            }

            const id2 = user.downVotes.indexOf(id)
            if (id2 > -1) {
              amend.results.downVotesCount--
              user.downVotes.splice(id2, 1)
            }

            amend.results.indVotesCount++
            user.indVotes.push(id)

            await user.save()
            await amend.save()

            if (io) {
              io.emit('amend/' + id, { data: amend })
            }

            return { data: amend }
          } else {
            return {
              error: { code: 405, message: 'Vous avez déjà voté indifférent' }
            }
          }
        } else {
          return {
            error: { code: 405, message: 'Ce scrutin est terminé' }
          }
        }
      } else {
        return {
          error: {
            code: 405,
            message: 'Cet utilisateur ne participe pas au texte'
          }
        }
      }
    } else {
      return {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      }
    }
  }

  async upVoteAmend(
    id: string,
    token: string,
    io?: Server
  ): Promise<IResponse<Amend>> {
    if (!this.auth.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    if (this.auth.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Token expiré' }
      }
    }
    const user: User = await User.findOne(this.auth.decodeToken(token).id)
    if (user && user.activated) {
      const amend: Amend = await Amend.findOne(id)
      if (user.followedTexts.indexOf(amend.text.toString()) > -1) {
        if (!amend.closed) {
          if (user.upVotes.indexOf(id) === -1) {
            const id1 = user.downVotes.indexOf(id)
            if (id1 > -1) {
              amend.results.downVotesCount--
              user.downVotes.splice(id1, 1)
            }

            const id2 = user.indVotes.indexOf(id)
            if (id2 > -1) {
              amend.results.indVotesCount--
              user.indVotes.splice(id2, 1)
            }

            amend.results.upVotesCount++
            user.upVotes.push(id)

            await user.save()
            await amend.save()

            if (io) {
              io.emit('amend/' + id, { data: amend })
            }

            return { data: amend }
          } else {
            return {
              error: { code: 405, message: 'Vous avez déjà voté pour' }
            }
          }
        } else {
          return {
            error: { code: 405, message: 'Ce scrutin est terminé' }
          }
        }
      } else {
        return {
          error: {
            code: 405,
            message: 'Cet utilisateur ne participe pas au texte'
          }
        }
      }
    } else {
      return {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      }
    }
  }

  async unVoteAmend(
    id: string,
    token: string,
    io?: Server
  ): Promise<IResponse<Amend>> {
    if (!this.auth.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    if (this.auth.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Token expiré' }
      }
    }
    const user: User = await User.findOne(this.auth.decodeToken(token).id)
    if (user && user.activated) {
      const amend = await Amend.findOne(id)
      if (user.followedTexts.indexOf(amend.text.toString()) > -1) {
        if (!amend.closed) {
          const id1 = user.upVotes.indexOf(id)
          const id2 = user.downVotes.indexOf(id)
          const id3 = user.indVotes.indexOf(id)

          if (id1 > -1) {
            amend.results.upVotesCount--
            user.upVotes.splice(id1, 1)
          }

          if (id2 > -1) {
            amend.results.downVotesCount--
            user.downVotes.splice(id2, 1)
          }

          if (id3 > -1) {
            amend.results.indVotesCount--
            user.indVotes.splice(id3, 1)
          }

          await user.save()
          await amend.save()

          if (io) {
            io.emit('amend/' + id, { data: amend })
          }

          return { data: amend }
        } else {
          return {
            error: { code: 405, message: 'Ce scrutin est terminé' }
          }
        }
      } else {
        return {
          error: {
            code: 405,
            message: 'Cet utilisateur ne participe pas à ce texte'
          }
        }
      }
    } else {
      return {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      }
    }
  }

  async postAmend(
    data: {
      name: string
      description: string
      patch: string
      version: number
      textID: string
    },
    token: string,
    io?: Server
  ): Promise<IResponse<Amend>> {
    const { name, description, patch, version, textID } = data
    if (!this.auth.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    if (this.auth.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Token expiré' }
      }
    }
    const user: User = await User.findOne(this.auth.decodeToken(token).id)
    if (user && user.activated) {
      const amend: Amend = new Amend(name, description, patch, textID, version)
      await amend.save()

      const text: Text = await Text.findOne(textID)
      text.amends.push(amend.id.toString())
      await text.save()

      const event: Event = new Event('amend', amend.id.toString())
      await event.save()

      if (io) {
        io.emit('events/new', { data: event })
        io.emit('text/' + textID, { data: text })
      }
      return { data: amend }
    } else {
      return {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      }
    }
  }

  async checkAmendVotes(io: Server) {
    // On récupère tous les scrutins en cours
    const amends = await Amend.find({ closed: false })

    const date = new Date()
    const now = date.getTime()

    amends.forEach(async (amend: Amend) => {
      const start = amend.created.getTime()
      const text = await Text.findOne(amend.text)

      // Si le scrutin est terminé
      if (now > start + amend.rules.delayMax) {
        amend.closed = true
        amend.finished = new Date()
        amend.results.totalPotentialVotesCount = text.followersCount

        // Si il y'a une majorité relative
        if (AmendService.hasRelativeUpMajority(amend)) {
          this.textService.updateTextWithAmend(text, amend, io)
        }

        await amend.save()
        const newAmend = await Amend.findOne(amend.id)
        io.emit('amend/' + amend.id, { data: newAmend })
        const oldEvent: Event = await Event.findOne({
          where: { target: { type: 'amend', id: newAmend.id.toString() } }
        })

        await Event.delete({ id: oldEvent.id })
        io.emit('events/delete', { data: oldEvent })

        const newEvent: Event = new Event('result', newAmend.id.toString())
        await newEvent.save()
        io.emit('events/new', { data: newEvent })
      }
    })
  }

  async postArgument(
    text: string,
    type: string,
    amendID: string,
    token: string
  ) {
    if (!this.auth.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    if (this.auth.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Token expiré' }
      }
    }
    const user = await User.findOne(this.auth.decodeToken(token).id)

    if (user && user.activated) {
      const amend = await Amend.findOne(amendID)
      if (amend) {
        const argumentDate = new Date(Date.now())
        const argument = {
          type,
          text,
          created: argumentDate,
          upVotesCount: 0,
          id: new ObjectID(argumentDate.getTime())
        }
        amend.arguments.push(argument)
        await amend.save()

        return { data: amend }
      } else {
        return {
          error: {
            code: 404,
            message: "Cet amendement n'existe pas."
          }
        }
      }
    } else {
      return {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      }
    }
  }

  async downVoteArgument(amendID: string, argumentID: string, token: string) {
    if (!this.auth.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    if (this.auth.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Token expiré' }
      }
    }
    const user: User = await User.findOne(this.auth.decodeToken(token).id)
    if (user && user.activated) {
      // Check if the user has already voted
      const userDownVote = user.argumentDownVotes.find(
        (argument: { amendID: string; argumentID: string }) =>
          argument.amendID === amendID && argument.argumentID === argumentID
      )
      const indexUserUpVote = findIndex(
        user.argumentUpVotes,
        (argument: { amendID: string; argumentID: string }) =>
          argument.amendID === amendID && argument.argumentID === argumentID
      )
      if (userDownVote) {
        return {
          error: {
            code: 405,
            message: "Vous n'avez pas encore voté pour cet argument"
          }
        }
      } else {
        // Get the amend
        const amend: Amend = await Amend.findOne(amendID)
        if (amend) {
          // Check if the argument exist
          const indexArgument = findIndex(
            amend.arguments,
            (argument: any) => argument.id.toString() === argumentID
          )
          if (amend.arguments[indexArgument]) {
            if (indexUserUpVote > -1) {
              user.argumentUpVotes.splice(indexUserUpVote, 1)
              amend.arguments[indexArgument].upVotesCount--
            }
            amend.arguments[indexArgument].upVotesCount--
            user.argumentDownVotes.push({ amendID, argumentID })
            await amend.save()
            await user.save()
            return { data: amend }
          } else {
            return {
              error: {
                code: 404,
                message: "Cet argument n'exite pas"
              }
            }
          }
        } else {
          return {
            error: {
              code: 404,
              message: "Cet amendement n'existe pas."
            }
          }
        }
      }
    } else {
      return {
        error: {
          code: 405,
          message: "Cet utilisateur n'est pas activé"
        }
      }
    }
  }

  async upVoteArgument(amendID: string, argumentID: string, token: string) {
    if (!this.auth.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    if (this.auth.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Token expiré' }
      }
    }
    const user: User = await User.findOne(this.auth.decodeToken(token).id)
    if (user && user.activated) {
      // Check if the user has already voted
      const userUpVote = user.argumentUpVotes.find(
        (argument: { amendID: string; argumentID: string }) =>
          argument.amendID === amendID && argument.argumentID === argumentID
      )
      const indexUserDownVote = findIndex(
        user.argumentDownVotes,
        (argument: { amendID: string; argumentID: string }) =>
          argument.amendID === amendID && argument.argumentID === argumentID
      )
      if (userUpVote) {
        return {
          error: { code: 405, message: 'Vous avez déjà voté pour cet argument' }
        }
      } else {
        // Get the amend
        const amend: Amend = await Amend.findOne(amendID)
        if (amend) {
          // Check if the argument exist
          const indexArgument = findIndex(
            amend.arguments,
            argument => argument.id.toString() === argumentID
          )
          if (amend.arguments[indexArgument]) {
            if (indexUserDownVote > -1) {
              user.argumentDownVotes.splice(indexUserDownVote, 1)
              amend.arguments[indexArgument].upVotesCount++
            }
            amend.arguments[indexArgument].upVotesCount++
            user.argumentUpVotes.push({ amendID, argumentID })
            await amend.save()
            await user.save()
            return { data: amend }
          } else {
            return {
              error: {
                code: 404,
                message: "Cet argument n'exite pas"
              }
            }
          }
        } else {
          return {
            error: {
              code: 404,
              message: "Cet amendement n'existe pas."
            }
          }
        }
      }
    } else {
      return {
        error: {
          code: 405,
          message: "Cet utilisateur n'est pas activé"
        }
      }
    }
  }

  async unVoteArgument(amendID: string, argumentID: string, token: string) {
    if (!this.auth.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    if (this.auth.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Token expiré' }
      }
    }
    const user: User = await User.findOne(this.auth.decodeToken(token).id)
    if (user && user.activated) {
      // Check if the user has already voted
      const indexUserUpVote = findIndex(
        user.argumentUpVotes,
        (argument: { amendID: string; argumentID: string }) =>
          argument.amendID === amendID && argument.argumentID === argumentID
      )
      const indexUserDownVote = findIndex(
        user.argumentDownVotes,
        (argument: { amendID: string; argumentID: string }) =>
          argument.amendID === amendID && argument.argumentID === argumentID
      )
      if (indexUserUpVote === -1 && indexUserDownVote === -1) {
        return {
          error: {
            code: 405,
            message: "Vous n'avez pas voté pour cet argument"
          }
        }
      } else {
        // Get the amend
        const amend: Amend = await Amend.findOne(amendID)
        if (amend) {
          // Check if the argument exist
          const indexArgument = findIndex(
            amend.arguments,
            argument => argument.id.toString() === argumentID
          )
          if (amend.arguments[indexArgument]) {
            // Remove the user's vote
            if (indexUserUpVote > -1) {
              user.argumentUpVotes.splice(indexUserUpVote, 1)
              amend.arguments[indexArgument].upVotesCount--
            }

            if (indexUserDownVote > -1) {
              user.argumentDownVotes.splice(indexUserDownVote, 1)
              amend.arguments[indexArgument].upVotesCount++
            }
            await amend.save()
            await user.save()
            return { data: amend }
          } else {
            return {
              error: {
                code: 404,
                message: "Cet argument n'exite pas"
              }
            }
          }
        } else {
          return {
            error: {
              code: 404,
              message: "Cet amendement n'existe pas."
            }
          }
        }
      }
    } else {
      return {
        error: {
          code: 405,
          message: "Cet utilisateur n'est pas activé"
        }
      }
    }
  }
}
