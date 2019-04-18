import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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
    @InjectRepository(Text)
    private readonly textRepository: Repository<Text>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Amend)
    private readonly amendRepository: Repository<Amend>,
    private textService: TextService
  ) {}

  async getAmend(id: string): Promise<IResponse<Amend>> {
    const data: Amend = await this.amendRepository.findOne(id)
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
    const user: User = await this.userRepository.findOne({
      id: Auth.decodeToken(token).id
    })
    if (user && user.activated) {
      const amend: Amend = await this.amendRepository.findOne(id)
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

            await this.userRepository.save(user)
            await this.amendRepository.save(user)

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
    const user: User = await this.userRepository.findOne({
      id: Auth.decodeToken(token).id
    })
    if (user && user.activated) {
      const amend: Amend = await this.amendRepository.findOne(id)
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

            await this.userRepository.save(user)
            await this.amendRepository.save(amend)

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
    const user: User = await this.userRepository.findOne({
      id: Auth.decodeToken(token).id
    })
    if (user && user.activated) {
      const amend: Amend = await this.amendRepository.findOne(id)
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

            await this.userRepository.save(user)
            await this.amendRepository.save(amend)

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
    const user: User = await this.userRepository.findOne({
      id: Auth.decodeToken(token).id
    })
    if (user && user.activated) {
      const amend = await this.amendRepository.findOne(id)
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

          await this.userRepository.save(user)
          await this.amendRepository.save(amend)

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
    const user: User = await this.userRepository.findOne({
      id: Auth.decodeToken(token).id
    })
    if (user && user.activated) {
      const amend: Amend = new Amend(name, description, patch, textID, version)
      await this.amendRepository.save(amend)

      const text: Text = await this.textRepository.findOne({ id: textID })
      text.amends.push(amend.id)
      await this.textRepository.save(text)

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
    const amends = await this.amendRepository.find({ closed: false })
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

        await this.amendRepository.save(amend)
        const newAmend = await this.amendRepository.findOne({ id: amend.id })
        io.emit('amend/' + amend._id, { data: newAmend })

        const oldEvent: Event = await this.eventRepository.findOne({
          target: { id: newAmend.id.toString() }
        })
        await this.eventRepository.delete({ id: oldEvent.id })
        io.emit('events/delete', { data: oldEvent })

        const newEvent: Event = new Event('result', newAmend.id.toString())
        await this.eventRepository.save(newEvent)
        io.emit('events/new', { data: newEvent })
      }
    })

    delay(() => {
      this.checkAmendVotes(io)
    }, 5000)
  }
}
