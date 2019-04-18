import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Server } from 'socket.io'
// Interfaces
import { IResponse } from '../../../interfaces'
// Services
import { Auth } from '.'
// Entities
import { Text, User, Event, Amend } from '../entities'
// Diff Patch Library
import * as JsDiff from 'diff'

@Injectable()
export class TextService {
  constructor(
    @InjectRepository(Text)
    private readonly textRepository: Repository<Text>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Amend)
    private readonly amendRepository: Repository<Amend>
  ) {}

  async getText(id: string): Promise<IResponse<Text>> {
    const data = await this.textRepository.findOne(id)
    return data
      ? { data }
      : {
          error: { code: 404, message: "Oups, ce texte n'existe pas ou plus" }
        }
  }

  async getTexts(): Promise<IResponse<string[]>> {
    const data: Text[] = await this.textRepository.find()
    return data
      ? {
          data: data.map(text => text.id.toString())
        }
      : {
          error: { code: 405, message: "Oups, il y'a eu une erreur" }
        }
  }

  async followText(
    id: string,
    token: string,
    io?: Server
  ): Promise<IResponse<Text>> {
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
    const user = await this.userRepository.findOne({
      id: Auth.decodeToken(token).id
    })
    if (user && user.activated) {
      if (user.followedTexts.indexOf(id) === -1) {
        user.followedTexts.push(id)
        await this.userRepository.save(user)

        const text = await this.textRepository.findOne(id)
        text.followersCount++
        await this.textRepository.save(text)

        if (io) {
          io.emit('text/' + text.id, { data: text })
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

  async unFollowText(
    idText: string,
    token: string,
    io?: Server
  ): Promise<IResponse<Text>> {
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
    const user = await this.userRepository.findOne({
      id: Auth.decodeToken(token).id
    })
    if (user && user.activated) {
      const id = user.followedTexts.indexOf(idText)
      if (id >= 0) {
        user.followedTexts.splice(id, 1)
        await this.userRepository.save(user)

        const text = await this.textRepository.findOne({ id: idText })
        text.followersCount--
        await this.textRepository.save(text)

        if (io) {
          io.emit('text/' + text.id, { data: text })
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

  async postText(
    name: string,
    description: string,
    token: string,
    io?: Server
  ): Promise<IResponse<Text>> {
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
    const user = await this.userRepository.findOne({
      id: Auth.decodeToken(token).id
    })
    if (user && user.activated) {
      const data = new Text(name, description)
      await this.textRepository.save(data)

      const event: Event = await new Event('text', data.id.toString())
      await this.eventRepository.save(event)

      const texts: Text[] = await this.textRepository.find()

      if (io) {
        io.emit('events/new', { data: event })
        io.emit('texts/all', { data: texts.map(texte => texte.id) })
      }

      return { data }
    } else {
      return {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      }
    }
  }

  async updateTextWithAmend(amend: any, io?: Server) {
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

    const text = (await this.getText(amend.text._id)).data

    if (io) {
      io.emit('text/' + text.id, { data: text })
    }

    const othersAmends = await this.amendRepository.find({
      text: text.id.toString(),
      closed: false
    })

    othersAmends.forEach(async (otherAmend: Amend) => {
      const isPatchable = JsDiff.applyPatch(text.actual, otherAmend.patch)
      let event: Event
      let oldEvent: Event
      if (isPatchable) {
        otherAmend.version = text.patches.length
      } else {
        otherAmend.conflicted = true
        otherAmend.closed = true
        otherAmend.finished = new Date()
        otherAmend.totalPotentialVotesCount = text.followersCount

        oldEvent = await this.eventRepository.findOne({
          target: { id: otherAmend.id.toString() }
        })
        event = new Event('result', otherAmend.id.toString())
        await this.eventRepository.save(event)
      }

      await this.amendRepository.save(otherAmend)
      await this.eventRepository.delete({ id: oldEvent.id })

      if (io) {
        if (event) {
          io.emit('events/new', { data: event })
        }
        if (oldEvent) {
          io.emit('events/delete', { data: oldEvent })
        }
        io.emit('amend/' + otherAmend.id, { data: otherAmend })
      }
    })
  }
}
