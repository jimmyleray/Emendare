import {Inject, Injectable} from '@nestjs/common'
// Interfaces
import { IResponse } from '../../../interfaces'
// Services
import { Auth, TextService } from '../services'
// Entities
import { Text, User, Event, Amend } from '../entities'
// Diff Patch Library
import { delay } from 'lodash'
import { Server } from 'socket.io'

@Injectable()
export class AmendService {
  constructor(
      @Inject('TextService') private readonly textService: TextService)
  {}

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
    if (!Auth.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    if (Auth.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Token expiré' }
      }
    }
    const user: User = await User.findOne({
      id: Auth.decodeToken(token).id
    })
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
    if (!Auth.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    if (Auth.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Token expiré' }
      }
    }
    const user: User = await User.findOne({
      id: Auth.decodeToken(token).id
    })
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
    if (!Auth.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    if (Auth.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Token expiré' }
      }
    }
    const user: User = await User.findOne({
      id: Auth.decodeToken(token).id
    })
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
    if (!Auth.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    if (Auth.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Token expiré' }
      }
    }
    const user: User = await User.findOne({
      id: Auth.decodeToken(token).id
    })
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
    if (!Auth.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    if (Auth.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Token expiré' }
      }
    }
    const user: User = await User.findOne({
      id: Auth.decodeToken(token).id
    })
    if (user && user.activated) {
      const amend: Amend = new Amend(name, description, patch, textID, version)
      await amend.save()

      const text: Text = await Text.findOne({ id: textID })
      text.amends.push(amend.id)
      await text.save()

      const event: Event = new Event('amend', amend.id.toString())

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

  async checkAmendVotes(io?: Server) {
    // On récupère tous les scrutins en cours
    const amends = await Amend.find({ closed: false })
    //.populate('text')

    const date = new Date()
    const now = date.getTime()

    amends.forEach(async (amend: any) => {
      const start = amend.created.getTime()

      // Si le scrutin est terminé
      if (now > start + amend.rules.delayMax) {
        amend.closed = true
        amend.finished = new Date()
        amend.results.totalPotentialVotesCount = amend.text.followersCount

        // Si il y'a une majorité relative
        if (AmendService.hasRelativeUpMajority(amend)) {
          this.textService.updateTextWithAmend(amend, io)
        }

        await amend.save()
        const newAmend = await Amend.findOne({ id: amend.id })
        io.emit('amend/' + amend._id, { data: newAmend })

        const oldEvent: Event = await Event.findOne({
          target: { id: newAmend.id.toString() }
        })
        await Event.delete({ id: oldEvent.id })
        io.emit('events/delete', { data: oldEvent })

        const newEvent: Event = new Event('result', newAmend.id.toString())
        await newEvent.save()
        io.emit('events/new', { data: newEvent })
      }
    })

    delay(() => {
      this.checkAmendVotes(io)
    }, 5000)
  }
}
