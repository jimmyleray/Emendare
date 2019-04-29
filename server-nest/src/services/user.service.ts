import { Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'
import { isUndefined } from 'lodash'
import { Server } from 'socket.io'
// Interfaces
import { IResponse } from '../../../interfaces'
// Services
import { Auth, Mail, Crypto, TextService, AmendService } from '../services'
// Entities
import { User, Amend } from '../entities'
// Mail
import { activation, reset } from '../emails'

@Injectable()
export class UserService {
  constructor(
    private readonly textService: TextService,
    private readonly amendService: AmendService
  ) {}

  async getUser(id: string): Promise<User> {
    if (id) {
      return await User.findOne({ id })
    }
  }

  async login(
    email?: string,
    password?: string,
    token?: string
  ): Promise<IResponse<any>> {
    if (email && password) {
      const user = await User.findOne({ email })
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
        const user = await User.findOne({ id })
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

  async subscribe(
    email: string | undefined,
    password: string | undefined
  ): Promise<IResponse<User>> {
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
    if (await User.findOne({ email })) {
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
    const user = new User(email, hash, activationToken)
    await user.save()

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

  async activateUser(activationToken: string): Promise<IResponse<User>> {
    const user = await User.findOne({ activationToken })
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

  async resetPassword(email: string | undefined): Promise<IResponse<User>> {
    if (!email) {
      return {
        error: { code: 405, message: "L'email est requis." }
      }
    }
    const user = await User.findOne({ email })
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

  async updatePassword(
    password: string,
    token: string
  ): Promise<IResponse<User>> {
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
    const user = await User.findOne({ id })
    const hash = bcrypt.hashSync(password, 10)
    user.password = hash
    await user.save()
    // send the user updated
    return { data: user }
  }

  async updateEmail(
    email: string | undefined,
    token: string
  ): Promise<IResponse<User>> {
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
    if (await User.findOne({ email })) {
      return {
        error: { code: 405, message: 'Cet email est déjà utilisée' }
      }
    }
    const { id } = Auth.decodeToken(token)
    const user = await User.findOne({ id })
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

  async updateLastEventDate(token: string): Promise<IResponse<User>> {
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
    const user = await User.findOne({ id })
    if (!user) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    user.lastEventDate = new Date()
    await user.save()
    return { data: user }
  }

  async toggleNotificationSetting(
    key: any,
    token: string
  ): Promise<IResponse<User>> {
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
    const user = await User.findOne({ id })
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

  async delete(token: string, io: Server): Promise<IResponse<any>> {
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
    const user = await User.findOne(id)
    if (!user) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    const openAmends = await this.getOpenAmends(user)

    for (const aId of openAmends) {
      await this.amendService.unVoteAmend(aId, token, io)
    }

    for (const fId of user.followedTexts) {
      await this.textService.unFollowText(fId, token, io)
    }

    try {
      await User.delete({ id })
      return { data: {} }
    } catch (error) {
      console.error(error)
    }
  }

  async getOpenAmends(user: User): Promise<string[]> {
    const amends: Amend[] = []
    const votes = [...user.upVotes, ...user.downVotes]

    for (const id of votes) {
      const amend = await Amend.findOne({ id })
      amends.push(amend)
    }

    return amends
      .filter(amend => amend && !amend.closed)
      .map(amend => amend.id.toString())
  }
}
