import mongoose from 'mongoose'
import socketIO from 'socket.io'
import { Amend, User, Event } from '../../models'
import { IResponse, IText, IEvent } from '../../../../interfaces'

// Diff Patch Library
import * as JsDiff from 'diff'

const model = mongoose.model(
  'Text',
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    followersCount: { type: Number, default: 0 },
    actual: { type: String, default: '' },
    patches: { type: [String], default: [] },
    amends: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amend' }],
      default: []
    },
    rules: { type: Boolean }
  })
)

export class Text {
  public static get model(): any {
    return model
  }

  public static async followText(
    id: string,
    token: string,
    io?: socketIO.Server
  ): Promise<IResponse<IText>> {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      if (user.followedTexts.indexOf(id) === -1) {
        user.followedTexts.push(id)
        await user.save()

        const text = await Text.model.findById(id)
        text.followersCount++
        await text.save()

        if (io) {
          io.emit('text/' + text._id, { data: text })
        }

        return { data: text }
      } else {
        return {
          error: { code: 405, message: 'Vous participez déjà à ce texte' }
        }
      }
    } else {
      return {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      }
    }
  }

  public static async unFollowText(
    idText: string,
    token: string,
    io?: socketIO.Server
  ): Promise<IResponse<IText>> {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const id = user.followedTexts.indexOf(idText)
      if (id >= 0) {
        user.followedTexts.splice(id, 1)
        await user.save()

        const text = await this.model.findById(idText)
        text.followersCount--
        await text.save()

        if (io) {
          io.emit('text/' + text._id, { data: text })
        }

        return { data: text }
      } else {
        return {
          error: { code: 405, message: "Ce texte n'est pas suivi" }
        }
      }
    } else {
      return {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      }
    }
  }

  public static async postText(
    { name, description }: { name: string; description: string },
    token: string,
    io?: socketIO.Server
  ): Promise<IResponse<IText>> {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const data = await new this.model({
        description,
        name
      }).save()

      await new Event.model({
        targetID: data._id,
        targetType: 'text'
      }).save()

      const events: IEvent[] = await Event.model.find().sort('-created')
      const texts: IText[] = await this.model.find()

      if (io) {
        io.emit('events/all', { data: events.map(event => event._id) })
        io.emit('texts/all', { data: texts.map(texte => texte._id) })
      }

      return { data }
    } else {
      return {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      }
    }
  }

  public static async getText(id: string): Promise<IResponse<IText>> {
    const data = await this.model.findById(id)
    return data
      ? { data }
      : {
          error: { code: 404, message: "Oups, ce texte n'existe pas ou plus" }
        }
  }

  public static async getTexts(): Promise<IResponse<string[]>> {
    const data: IText[] = await this.model.find()
    return data
      ? {
          data: data.map(text => text._id)
        }
      : {
          error: { code: 405, message: "Oups, il y'a eu une erreur" }
        }
  }

  public static async updateTextWithAmend(amend: any, io?: SocketIO.Server) {
    amend.accepted = true
    const newText = JsDiff.applyPatch(amend.text.actual, amend.patch)

    if (newText) {
      amend.version = amend.text.patches.length
      amend.text.patches.push(amend.patch)
      amend.text.actual = newText
    } else {
      amend.conflicted = true
    }

    await amend.text.save()

    const text = await Text.model.findById(amend.text._id)

    if (io) {
      io.emit('text/' + text._id, { data: text })
    }

    const othersAmends = await Amend.model.find({
      text: text._id,
      closed: false
    })

    othersAmends.forEach(async (otherAmend: any) => {
      const isPatchable = JsDiff.applyPatch(text.actual, otherAmend.patch)

      if (isPatchable) {
        otherAmend.version = text.patches.length
      } else {
        otherAmend.conflicted = true
        otherAmend.closed = true
        otherAmend.finished = new Date()
        otherAmend.totalPotentialVotesCount = text.followersCount

        await new Event.model({
          targetType: 'result',
          targetID: otherAmend._id
        }).save()
      }

      await otherAmend.save()

      if (io) {
        io.emit('amend/' + otherAmend._id, { data: otherAmend })
      }
    })
  }
}
