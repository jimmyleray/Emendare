import mongoose from 'mongoose'
import socketIO from 'socket.io'
import bcrypt from 'bcrypt'
import { isUndefined } from 'lodash'
import { Auth, Crypto, Mail } from '../../services'
import { activation, reset } from '../../emails'
import { Amend, Text } from '../../models'
import { IAmend, IUser, IResponse } from '../../../../interfaces'

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
    activationToken: { type: String, default: null },
    followedTexts: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Text' }],
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
    },
    argumentVotes: { type: [], default: [] }
  })
)

export class User {
  public static get model(): any {
    return model
  }

  public static async login(
    email?: string,
    password?: string,
    token?: string
  ): Promise<IResponse<any>> {
    if (email && password) {
      const user = await this.model.findOne({ email })
      if (!user) {
        return { error: { code: 405, message: "L'email est invalide" } }
      }
      if (!user.activated) {
        return {
          error: { code: 405, message: "Votre compte n'est pas activé" }
        }
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return {
          error: { code: 405, message: 'Le mot de passe est invalide' }
        }
      }
      const newToken = await Auth.createToken({ id: user.id })
      return { data: { user, token: newToken } }
    } else if (token) {
      if (Auth.isTokenValid(token)) {
        const { id } = Auth.decodeToken(token)
        const user = await this.model.findById(id)
        if (!user) {
          return { error: { code: 405, message: 'Ce compte a été supprimé' } }
        }
        return { data: { user, token } }
      } else {
        return {
          error: { code: 405, message: 'Le token est invalide' }
        }
      }
    } else {
      return {
        error: {
          code: 405,
          message: 'Vous devez spécifier un mot de passe et un email'
        }
      }
    }
  }

  public static async subscribe(
    email: string | undefined,
    password: string | undefined
  ): Promise<IResponse<IUser>> {
    if (!email) {
      return {
        error: { code: 405, message: "L'email est requis" }
      }
    }
    if (!password) {
      return {
        error: { code: 405, message: 'Le mot de passe est requis' }
      }
    }
    if (await this.model.findOne({ email })) {
      return {
        error: {
          code: 405,
          message:
            "Cet email est déjà utilisé. Si il s'agit de votre compte, essayez de vous y connecter directement."
        }
      }
    }
    const hash = bcrypt.hashSync(password, 10)
    const activationToken = Crypto.getToken()
    const user = await new this.model({
      email,
      password: hash,
      activationToken
    }).save()

    if (Mail) {
      Mail.send({
        to: email,
        subject: activation.subject,
        html: activation.html(activationToken)
      })
        .then(() => {
          return { data: user }
        })
        .catch(error => {
          return {
            error: { code: 500, message: "Erreur dans l'envoi du mail" }
          }
        })
    } else {
      return {
        error: {
          code: 500,
          message: "Les mails ne sont activés qu'en production"
        }
      }
    }
  }

  public static async activateUser(
    activationToken: string
  ): Promise<IResponse<IUser>> {
    const user = await this.model.findOne({ activationToken })
    if (!user) {
      return {
        error: { code: 405, message: 'Votre token est invalide' }
      }
    }
    if (user.activated) {
      return {
        error: { code: 405, message: 'Ce compte est déjà activé' }
      }
    }
    user.activated = true
    user.activationToken = null
    await user.save()
    return { data: user }
  }

  public static async resetPassword({
    email
  }: {
    email: string | undefined
  }): Promise<IResponse<IUser>> {
    if (!email) {
      return {
        error: { code: 405, message: "L'email est requis." }
      }
    }
    const user = await this.model.findOne({ email })
    if (!user) {
      return {
        error: { code: 405, message: "Cet email n'existe pas." }
      }
    }
    // Generate a new Password
    const newPassword = Crypto.getToken(16)
    // Update the user password
    const hash = bcrypt.hashSync(newPassword, 10)
    user.password = hash
    await user.save()

    if (!Mail) {
      return {
        error: {
          code: 500,
          message: "Les mails ne sont activés qu'en production"
        }
      }
    }

    Mail.send({
      to: email,
      subject: reset.subject,
      html: reset.html(newPassword)
    })
      .then(() => {
        return { data: user }
      })
      .catch((error: any) => {
        console.error(error)
        return {
          error: {
            code: 500,
            message: "Erreur lors de l'envoi du mail"
          }
        }
      })
  }

  public static async updatePassword(
    password: string,
    token: string
  ): Promise<IResponse<IUser>> {
    if (!password || !token) {
      return {
        error: { code: 405, message: 'Requête invalide' }
      }
    }
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
    const { id } = Auth.decodeToken(token)
    const user = await this.model.findById(id)
    const hash = bcrypt.hashSync(password, 10)
    user.password = hash
    await user.save()
    // send the user updated
    return { data: user }
  }

  public static async updateEmail(
    email: string | undefined,
    token: string
  ): Promise<IResponse<IUser>> {
    if (!email || !token) {
      return {
        error: { code: 405, message: 'Requête invalide' }
      }
    }
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
    if (await this.model.findOne({ email })) {
      return {
        error: { code: 405, message: 'Cet email est déjà utilisée' }
      }
    }
    const { id } = Auth.decodeToken(token)
    const user = await this.model.findById(id)
    if (!user) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }

    // Set the new email and the token for the activation
    const activationToken = Crypto.getToken()
    user.activationToken = activationToken
    user.email = email
    user.activated = false
    await user.save()

    if (!Mail) {
      return {
        error: {
          code: 500,
          message: "Les mails ne sont activés qu'en production"
        }
      }
    }

    Mail.send({
      to: email,
      subject: activation.subject,
      html: activation.html(activationToken)
    })
      .then(() => {
        // deconnect the user
        return { data: user }
      })
      .catch(error => {
        console.error(error)
      })
  }

  public static async updateLastEventDate(
    token: string
  ): Promise<IResponse<IUser>> {
    if (!token || !Auth.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Le token est invalide' }
      }
    }
    if (Auth.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Le token est expiré' }
      }
    }
    const { id } = Auth.decodeToken(token)
    const user = await this.model.findById(id)
    if (!user) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    user.lastEventDate = new Date()
    await user.save()
    return { data: user }
  }

  public static async toggleNotificationSetting(
    key: any,
    token: string
  ): Promise<IResponse<IUser>> {
    if (!token || !Auth.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Le token est invalide' }
      }
    }
    if (Auth.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Le token est expiré' }
      }
    }
    const { id } = Auth.decodeToken(token)
    const user = await this.model.findById(id)
    if (!user) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    if (isUndefined(user.notifications[key])) {
      return {
        error: { code: 405, message: 'Cette clé de requête est invalide' }
      }
    }
    user.notifications[key] = !user.notifications[key]
    await user.save()
    return { data: user }
  }

  public static async delete(
    token: string,
    io?: socketIO.Server
  ): Promise<IResponse<any>> {
    if (!token || !Auth.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Le token est invalide' }
      }
    }
    if (Auth.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Le token est expiré' }
      }
    }
    const { id } = Auth.decodeToken(token)
    const user = await this.model.findById(id)
    if (!user) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    const openAmends = await this.getOpenAmends(user)

    for (const aId of openAmends) {
      await Amend.unVoteAmend(aId, token, io)
    }

    for (const fId of user.followedTexts) {
      await Text.unFollowText(fId, token, io)
    }

    try {
      await this.model.findOneAndDelete({ _id: id })
      return { data: {} }
    } catch (error) {
      console.error(error)
    }
  }

  private static async getOpenAmends(user: IUser): Promise<string[]> {
    const amends: IAmend[] = []
    const votes = [...user.indVotes, ...user.upVotes, ...user.downVotes]

    for (const id of votes) {
      const amend = await Amend.model.findById(id)
      amends.push(amend)
    }

    return amends
      .filter(amend => amend && !amend.closed)
      .map(amend => amend._id)
  }
}
