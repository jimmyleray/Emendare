import mongoose from 'mongoose'
import { User, Event } from '../../models'

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
    rules: { type: Boolean, default: false }
  })
)

export class Text {
  static get model(): any {
    return model
  }

  static async followText(id: string, token: string): Promise<any> {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      if (user.followedTexts.indexOf(id) === -1) {
        user.followedTexts.push(id)
        await user.save()

        const text = await Text.model.findById(id)
        text.followersCount++
        await text.save()

        return { textId: text._id, data: text }
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

  static async unFollowText(idText: string, token: string): Promise<any> {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const id = user.followedTexts.indexOf(idText)
      if (id >= 0) {
        user.followedTexts.splice(id, 1)
        await user.save()

        const text = await this.model.findById(idText)
        text.followersCount--
        await text.save()

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

  static async postText(
    name: string,
    description: string,
    token: string
  ): Promise<any> {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const text = await new this.model({
        description,
        name
      }).save()

      await new Event.model({
        targetID: text._id,
        targetType: 'text'
      }).save()
      const events = await Event.model.find().sort('-created')
      const texts = await this.model.find({ rules: false })
      return {
        data: {
          texts: texts,
          text: text,
          events: events
        }
      }
    } else {
      return {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      }
    }
  }

  static async getText(id: string): Promise<any> {
    const gettedText = await this.model.findById(id)
    if (gettedText) {
      return { data: gettedText }
    } else {
      return {
        error: { code: 404, message: "Oups, ce texte n'existe pas ou plus" }
      }
    }
  }

  static async getTexts(): Promise<any> {
    const gettedTexts = await this.model.find({ rules: false })
    if (gettedTexts) {
      return {
        data: gettedTexts.map((text: any) => text._id)
      }
    } else {
      return {
        error: { code: 405, message: "Oups, il y'a eu une erreur" }
      }
    }
  }
}
