import { Injectable, Inject } from '@nestjs/common'
import { hashSync, compareSync } from 'bcrypt'
import { isUndefined } from 'lodash'
import { Server } from 'socket.io'

import { IResponse } from '../../../../interfaces'
import { User, Amend } from '../../entities'
import { activation, reset } from '../../emails'

import {
  AuthService,
  MailService,
  CryptoService,
  TextService,
  AmendService
} from '..'

@Injectable()
export class UserService {
  constructor(
    @Inject('TextService') private readonly textService: TextService,
    @Inject('AmendService') private readonly amendService: AmendService,
    @Inject('AuthService') private readonly authService: AuthService,
    @Inject('MailService') private readonly mailerService: MailService,
    @Inject('CryptoService') private readonly cryptoService: CryptoService
  ) {}

  async getUser(id: string): Promise<User> {
    if (id) {
      return await User.findOne(id)
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
      if (!compareSync(password, user.password)) {
        return {
          error: { code: 405, message: 'Le mot de passe est invalide' }
        }
      }
      const newToken = this.authService.createToken({ id: user.id })
      return { data: { user, token: newToken } }
    } else if (token) {
      if (this.authService.isTokenValid(token)) {
        const { id } = this.authService.decodeToken(token)
        const user = await User.findOne(id)
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
    const hash = hashSync(password, 10)
    const activationToken = this.cryptoService.getToken()
    const user = new User(email, hash, activationToken)
    await user.save()

    this.mailerService
      .send({
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
    const newPassword = this.cryptoService.getToken(16)
    // Update the user password
    const hash = hashSync(newPassword, 10)
    user.password = hash
    await user.save()

    this.mailerService
      .send({
        to: email,
        subject: reset.subject,
        html: reset.html(newPassword)
      })
      .then(() => {
        return { data: user }
      })
      .catch((error: any) => {
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
    if (!this.authService.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    if (this.authService.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Token expiré' }
      }
    }
    const { id } = this.authService.decodeToken(token)
    const user = await User.findOne(id)
    const hash = hashSync(password, 10)
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
    if (!this.authService.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    if (this.authService.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Token expiré' }
      }
    }
    if (await User.findOne({ email })) {
      return {
        error: { code: 405, message: 'Cet email est déjà utilisée' }
      }
    }
    const { id } = this.authService.decodeToken(token)
    const user = await User.findOne(id)
    if (!user) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }

    // Set the new email and the token for the activation
    const activationToken = this.cryptoService.getToken()
    user.activationToken = activationToken
    user.email = email
    user.activated = false
    await user.save()

    this.mailerService
      .send({
        to: email,
        subject: activation.subject,
        html: activation.html(activationToken)
      })
      .then(() => {
        // deconnect the user
        return { data: user }
      })
      .catch(error => {
        return {
          error: {
            code: 500,
            message: "Les mails ne sont activés qu'en production"
          }
        }
      })
  }

  async updateLastEventDate(token: string): Promise<IResponse<User>> {
    if (!token || !this.authService.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Le token est invalide' }
      }
    }
    if (this.authService.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Le token est expiré' }
      }
    }
    const { id } = this.authService.decodeToken(token)
    const user = await User.findOne(id)
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
    if (!token || !this.authService.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Le token est invalide' }
      }
    }
    if (this.authService.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Le token est expiré' }
      }
    }
    const { id } = this.authService.decodeToken(token)
    const user = await User.findOne(id)
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
    if (!token || !this.authService.isTokenValid(token)) {
      return {
        error: { code: 405, message: 'Le token est invalide' }
      }
    }
    if (this.authService.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Le token est expiré' }
      }
    }
    const { id } = this.authService.decodeToken(token)
    const user = await User.findOne(id)
    if (!user) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }
    const openAmends = await this.getOpenAmends(user)

    for (const amendID of openAmends) {
      await this.amendService.unVoteAmend({ user, id: amendID }, io)
    }

    for (const textID of user.followedTexts) {
      await this.textService.unFollowText({ user, id: textID }, io)
    }

    try {
      await User.delete(id)
      return { data: {} }
    } catch (error) {
      console.error(error)
    }
  }

  async getOpenAmends(user: User): Promise<string[]> {
    const amends: Amend[] = []
    const votes = [...user.upVotes, ...user.downVotes]

    for (const id of votes) {
      const amend = await Amend.findOne(id)
      amends.push(amend)
    }

    return amends
      .filter(amend => amend && !amend.closed)
      .map(amend => amend.id.toString())
  }
}
