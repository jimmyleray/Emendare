import mongoose from 'mongoose'
import socketIO from 'socket.io'
import { Auth } from '../../services'
import { User, Text, Event } from '../../models'
import {
  IAmend,
  IResponse,
  IUser,
  IText,
  IEvent,
  IArgument
} from '../../../../interfaces'
import { delay, findIndex } from 'lodash'

const oneSecond = 1000
const oneMinute = oneSecond * 60
const oneHour = oneMinute * 60
const oneDay = oneHour * 24

const model = mongoose.model(
  'Amend',
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    finished: { type: Date },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    patch: { type: String, required: true },
    version: { type: Number, default: 0 },
    text: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Text',
      required: true
    },
    arguments: [
      {
        created: { type: Date, default: Date.now },
        text: { type: String, required: true },
        type: { type: String, required: true },
        upVotesCount: { type: Number, default: 0 }
      }
    ],
    totalPotentialVotesCount: { type: Number },
    results: {
      totalPotentialVotesCount: { type: Number },
      upVotesCount: { type: Number, default: 0 },
      downVotesCount: { type: Number, default: 0 },
      indVotesCount: { type: Number, default: 0 }
    },
    rules: {
      delayMax: {
        type: Number,
        default: oneDay
      }
    },
    closed: { type: Boolean, default: false },
    accepted: { type: Boolean, default: false },
    conflicted: { type: Boolean, default: false }
  })
)

export class Amend {
  public static get model(): any {
    return model
  }

  public static async getAmend(id: string): Promise<IResponse<IAmend>> {
    const data: IAmend = await this.model.findById(id)
    return data
      ? { data }
      : {
          error: {
            code: 404,
            message: "Oups, cet amendement n'existe pas ou plus"
          }
        }
  }

  public static hasAbsoluteUpMajority(amend: any) {
    return (
      amend.results.upVotesCount > amend.results.indVotesCount &&
      amend.results.upVotesCount + amend.results.indVotesCount >=
        Math.floor(amend.text.followersCount / 2) + 1
    )
  }

  public static hasAbsoluteDownMajority(amend: any) {
    return (
      amend.results.downVotesCount > amend.results.indVotesCount &&
      amend.results.downVotesCount + amend.results.indVotesCount >=
        Math.floor(amend.text.followersCount / 2) + 1
    )
  }

  public static hasAbsoluteMajority(amend: any) {
    return (
      this.hasAbsoluteUpMajority(amend) || this.hasAbsoluteDownMajority(amend)
    )
  }

  public static hasRelativeUpMajority(amend: any) {
    return amend.results.upVotesCount > amend.results.downVotesCount
  }

  public static async downVoteAmend(
    id: string,
    token: string,
    io?: socketIO.Server
  ): Promise<IResponse<IAmend>> {
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
    const user: IUser = await User.model.findById(Auth.decodeToken(token).id)
    if (user && user.activated) {
      const amend: IAmend = await this.model.findById(id)
      if (user.followedTexts.indexOf(amend.text) > -1) {
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

  public static async indVoteAmend(
    id: string,
    token: string,
    io?: socketIO.Server
  ): Promise<IResponse<IAmend>> {
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
    const user: IUser = await User.model.findById(Auth.decodeToken(token).id)
    if (user && user.activated) {
      const amend: IAmend = await this.model.findById(id)
      if (user.followedTexts.indexOf(amend.text) > -1) {
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

  public static async postAmend(
    data: {
      name: string
      description: string
      patch: string
      version: number
      textID: string
    },
    token: string,
    io?: socketIO.Server
  ): Promise<IResponse<IAmend>> {
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
    const user: IUser = await User.model.findById(Auth.decodeToken(token).id)
    if (user && user.activated) {
      const amend: IAmend = await new this.model({
        description,
        name,
        patch,
        text: textID,
        version
      }).save()

      const text: IText = await Text.model.findById(textID)
      text.amends.push(amend._id)
      await text.save()

      const event: IEvent = await new Event.model({
        target: {
          type: 'amend',
          id: amend._id
        }
      }).save()

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

  public static async unVoteAmend(
    id: string,
    token: string,
    io?: socketIO.Server
  ): Promise<IResponse<IAmend>> {
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
    const user: IUser = await User.model.findById(Auth.decodeToken(token).id)
    if (user && user.activated) {
      const amend = await this.model.findById(id)
      if (user.followedTexts.indexOf(amend.text) > -1) {
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

  public static async upVoteAmend(
    id: string,
    token: string,
    io?: socketIO.Server
  ): Promise<IResponse<IAmend>> {
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
    const user: IUser = await User.model.findById(Auth.decodeToken(token).id)
    if (user && user.activated) {
      const amend: IAmend = await this.model.findById(id)
      if (user.followedTexts.indexOf(amend.text) > -1) {
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

  public static async checkAmendVotes(io?: socketIO.Server) {
    // On récupère tous les scrutins en cours
    const amends = await Amend.model.find({ closed: false }).populate('text')

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
        if (Amend.hasRelativeUpMajority(amend)) {
          Text.updateTextWithAmend(amend, io)
        }

        await amend.save()
        const newAmend = await Amend.model.findById(amend._id)
        io.emit('amend/' + amend._id, { data: newAmend })

        const oldEvent: IEvent = await Event.model.findOne({
          'target.id': newAmend._id
        })
        await Event.model.findOneAndDelete({ _id: oldEvent._id })
        io.emit('events/delete', { data: oldEvent })

        const newEvent: IEvent = await new Event.model({
          target: {
            type: 'result',
            id: newAmend._id
          }
        }).save()
        io.emit('events/new', { data: newEvent })
      }
    })

    delay(() => {
      this.checkAmendVotes(io)
    }, 5000)
  }

  public static async postArgument(
    text: string,
    type: string,
    amendID: string,
    token: string
  ) {
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
    const user = await User.model.findById(Auth.decodeToken(token).id)

    if (user && user.activated) {
      const amend = await this.model.findById(amendID)
      if (amend) {
        const argument = {
          type,
          text,
          created: Date.now(),
          upVotesCount: 0
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

  /**
   * Add a vote to an argument
   * @param amendID Id of the amend
   * @param argumentID Id of the argument
   * @param token user token
   */
  public static async downVoteArgument(
    amendID: string,
    argumentID: string,
    token: string
  ) {
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
    const user: IUser = await User.model.findById(Auth.decodeToken(token).id)
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
        const amend: IAmend = await this.model.findById(amendID)
        if (amend) {
          // Check if the argument exist
          const indexArgument = findIndex(
            amend.arguments,
            (argument: IArgument) => argument._id.toString() === argumentID
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

  /**
   * Undo his vote to an argument
   * @param amendID Id of the amend
   * @param argumentID Id of the argument
   * @param token user token
   */
  public static async upVoteArgument(
    amendID: string,
    argumentID: string,
    token: string
  ) {
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
    const user: IUser = await User.model.findById(Auth.decodeToken(token).id)
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
        const amend: IAmend = await this.model.findById(amendID)
        if (amend) {
          // Check if the argument exist
          const indexArgument = findIndex(
            amend.arguments,
            (argument: IArgument) => argument._id.toString() === argumentID
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
}
