import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { Crypto } from '../services'

const model = mongoose.model(
  'User',
  new mongoose.Schema({
    activated: {
      type: Boolean,
      default: process.env.NODE_ENV !== 'production'
    },
    password: { type: String, required: true },
    email: { type: String, required: true },
    created: { type: Date, default: Date.now },
    lastEventDate: { type: Date, default: Date.now },
    token: { type: String, default: null },
    activationToken: { type: String, default: null },
    followedTexts: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Text' }],
      default: []
    },
    amends: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amend' }],
      default: []
    },
    upVotes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amend' }],
      default: []
    },
    downVotes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amend' }],
      default: []
    },
    indVotes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amend' }],
      default: []
    },
    notifications: {
      newText: { type: Boolean, default: true },
      newAmend: { type: Boolean, default: true },
      amendAccepted: { type: Boolean, default: true },
      amendRefused: { type: Boolean, default: true }
    }
  })
)

export class User {
  static get model(): any {
    return model
  }
  static async login(email?: string, password?: string, token?: string) {
    const user = await this.model.findOne({ email })
    if (email && password) {
      if (user) {
        if (user.activated) {
          bcrypt.compare(password, user.password, async (err, valid) => {
            if (err) {
              console.error(err)
            } else {
              if (valid) {
                user.token = Crypto.getToken()
                await user.save()
                return { data: user }
              } else {
                return {
                  error: { code: 405, message: 'Le mot de passe est invalide' }
                }
              }
            }
          })
        } else {
          return {
            error: { code: 405, message: "Votre compte n'est pas activé" }
          }
        }
      } else {
        return { error: { code: 405, message: "L'email est invalide" } }
      }
    } else if (token) {
      const user = await this.model.findOne({ token })
      if (user) {
        return { data: user }
      } else {
        return {
          error: {
            code: 405,
            message: 'Le token est invalide'
          }
        }
      }
    }
  }
}
