import mongoose from 'mongoose'
import { User, Text, Event } from '../../models'

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
    arguments: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Argument' }],
      default: []
    },
    upVotesCount: { type: Number, default: 0 },
    downVotesCount: { type: Number, default: 0 },
    indVotesCount: { type: Number, default: 0 },
    totalPotentialVotesCount: { type: Number },
    delayMin: {
      type: Number,
      default: process.env.NODE_ENV === 'production' ? oneHour : oneMinute
    },
    delayMax: {
      type: Number,
      default: process.env.NODE_ENV === 'production' ? oneDay : oneHour
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

  public static async getAmend(id: string): Promise<any> {
    const gettedAmend = await this.model.findById(id)
    if (gettedAmend) {
      return { data: gettedAmend }
    } else {
      return {
        error: {
          code: 404,
          message: "Oups, cet amendement n'existe pas ou plus"
        }
      }
    }
  }

  public static async downVoteAmend(id: string, token: string): Promise<any> {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const amend = await this.model.findById(id)
      if (user.followedTexts.indexOf(amend.text) > -1) {
        if (!amend.closed) {
          if (user.downVotes.indexOf(id) === -1) {
            const id1 = user.upVotes.indexOf(id)
            if (id1 > -1) {
              amend.upVotesCount--
              user.upVotes.splice(id1, 1)
            }

            const id2 = user.indVotes.indexOf(id)
            if (id2 > -1) {
              amend.indVotesCount--
              user.indVotes.splice(id2, 1)
            }

            amend.downVotesCount++
            user.downVotes.push(id)

            await user.save()
            await amend.save()

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

  public static async indVoteAmend(id: string, token: string): Promise<any> {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const amend = await this.model.findById(id)
      if (user.followedTexts.indexOf(amend.text) > -1) {
        if (!amend.closed) {
          if (user.indVotes.indexOf(id) === -1) {
            const id1 = user.upVotes.indexOf(id)
            if (id1 > -1) {
              amend.upVotesCount--
              user.upVotes.splice(id1, 1)
            }

            const id2 = user.downVotes.indexOf(id)
            if (id2 > -1) {
              amend.downVotesCount--
              user.downVotes.splice(id2, 1)
            }

            amend.indVotesCount++
            user.indVotes.push(id)

            await user.save()
            await amend.save()

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
    name: string,
    description: string,
    patch: any,
    version: any,
    textID: any,
    token: string
  ): Promise<any> {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const amend = await new this.model({
        description,
        name,
        patch,
        text: textID,
        version
      }).save()

      const text = await Text.model.findById(textID)
      text.amends.push(amend._id)
      await text.save()

      await new Event.model({
        targetID: amend._id,
        targetType: 'amend'
      }).save()

      const events = await Event.model.find().sort('-created')

      return {
        data: {
          events,
          amend,
          text
        }
      }
    } else {
      return {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      }
    }
  }

  public static async unVoteAmend(id: string, token: string): Promise<any> {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const amend = await this.model.findById(id)
      if (user.followedTexts.indexOf(amend.text) > -1) {
        if (!amend.closed) {
          const id1 = user.upVotes.indexOf(id)
          const id2 = user.downVotes.indexOf(id)
          const id3 = user.indVotes.indexOf(id)

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
          await amend.save()

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

  public static async upVoteAmend(id: string, token: string): Promise<any> {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const amend = await this.model.findById(id)
      if (user.followedTexts.indexOf(amend.text) > -1) {
        if (!amend.closed) {
          if (user.upVotes.indexOf(id) === -1) {
            const id1 = user.downVotes.indexOf(id)
            if (id1 > -1) {
              amend.downVotesCount--
              user.downVotes.splice(id1, 1)
            }

            const id2 = user.indVotes.indexOf(id)
            if (id2 > -1) {
              amend.indVotesCount--
              user.indVotes.splice(id2, 1)
            }

            amend.upVotesCount++
            user.upVotes.push(id)

            await user.save()
            await amend.save()

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
}
