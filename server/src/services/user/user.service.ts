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
} from '../../services'

@Injectable()
export class UserService {
  constructor(
    @Inject('TextService') private readonly textService: TextService,
    @Inject('AmendService') private readonly amendService: AmendService,
    @Inject('AuthService') private readonly authService: AuthService,
    @Inject('MailService') private readonly mailService: MailService,
    @Inject('CryptoService') private readonly cryptoService: CryptoService
  ) {}

  async getUser(id: string): Promise<User> {
    return await User.findOne(id)
  }

  async login(data: any, token?: string): Promise<IResponse<any>> {
    const { email, password } = data

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

  async subscribe(data: any): Promise<IResponse<User>> {
    const { email, password } = data

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

    const alreadyUser = await User.findOne({ email })

    if (alreadyUser) {
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

    return this.sendActivationMail(user, email, activationToken)
  }

  async sendActivationMail(
    user: User,
    email: string,
    activationToken: string
  ): Promise<IResponse<User>> {
    try {
      await this.mailService.send({
        to: email,
        subject: activation.subject,
        html: activation.html(activationToken)
      })

      return { data: user }
    } catch (error) {
      console.error(error)

      return {
        error: { code: 500, message: "Erreur dans l'envoi du mail" }
      }
    }
  }

  async sendResetMail(
    user: User,
    email: string,
    newPassword: string
  ): Promise<IResponse<User>> {
    try {
      await this.mailService.send({
        to: email,
        subject: reset.subject,
        html: reset.html(newPassword)
      })

      return { data: user }
    } catch (error) {
      console.error(error)

      return {
        error: { code: 500, message: "Erreur dans l'envoi du mail" }
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

  async resetPassword(data: any): Promise<IResponse<User>> {
    const { user, email } = data

    if (!email) {
      return {
        error: { code: 405, message: "L'email est requis." }
      }
    }

    // Generate a new Password
    const newPassword = this.cryptoService.getToken(16)

    // Update the user password
    const hash = hashSync(newPassword, 10)
    user.password = hash
    await user.save()

    return this.sendResetMail(user, email, newPassword)
  }

  async updatePassword(data: any): Promise<IResponse<User>> {
    const { user, password } = data
    const hash = hashSync(password, 10)
    user.password = hash
    await user.save()

    // send the user updated
    return { data: user }
  }

  async updateEmail(data: any): Promise<IResponse<User>> {
    const { user, email } = data
    const alreadyUser = await User.findOne({ email })

    if (alreadyUser) {
      return {
        error: { code: 405, message: 'Cet email est déjà utilisée' }
      }
    }

    // Set the new email and the token for the activation
    const activationToken = this.cryptoService.getToken()
    user.activationToken = activationToken
    user.email = email
    user.activated = false
    await user.save()

    return this.sendActivationMail(user, email, activationToken)
  }

  async updateLastEventDate(data: any): Promise<IResponse<User>> {
    const { user } = data

    if (!user) {
      return {
        error: { code: 405, message: 'Token invalide' }
      }
    }

    user.lastEventDate = new Date()
    await user.save()
    return { data: user }
  }

  async toggleNotificationSetting(data: any): Promise<IResponse<User>> {
    const { user, key } = data

    if (isUndefined(user.notifications[key])) {
      return {
        error: { code: 405, message: 'Cette clé de requête est invalide' }
      }
    }

    user.notifications[key] = !user.notifications[key]
    await user.save()
    return { data: user }
  }

  async delete(data: any, io: Server): Promise<IResponse<any>> {
    const { user } = data

    const openAmends = await this.getOpenAmends(user)

    for (const amendID of openAmends) {
      await this.amendService.unVoteAmend({ user, id: amendID }, io)
    }

    for (const textID of user.followedTexts) {
      await this.textService.unFollowText({ user, id: textID }, io)
    }

    try {
      await User.delete(user.id)
      return { data: {} }
    } catch (error) {
      console.error(error)
      return {
        error: { code: 500, message: 'Servor error' }
      }
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
