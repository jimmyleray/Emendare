import { Injectable } from '@nestjs/common'
import { Server } from 'socket.io'
import * as JsDiff from 'diff'

import { IResponse, IResponseWithEvent } from '../../../../interfaces'
import { Text, Event, Amend } from '../../entities'
import { pubSub } from 'src/common'
import { Topic } from '../../common/topics'

@Injectable()
export class TextService {
  async getText(id: string): Promise<IResponse<Text>> {
    const data = await Text.findOne(id)

    if (data) {
      return { data }
    } else {
      return {
        error: { code: 404, message: "Oups, ce texte n'existe pas ou plus" }
      }
    }
  }

  async getTexts(): Promise<IResponse<string[]>> {
    const data: Text[] = await Text.find()

    if (data) {
      return {
        data: data.map(text => text.id.toString())
      }
    } else {
      return {
        error: { code: 405, message: "Oups, il y'a eu une erreur" }
      }
    }
  }

  async followText(data: any, io?: Server): Promise<IResponse<Text>> {
    const { user, id } = data

    if (user.followedTexts.indexOf(id) === -1) {
      user.followedTexts.push(id)
      await user.save()

      const text = await Text.findOne(id)
      text.followersCount++
      await text.save()

      if (io) {
        io.emit('text/' + text.id, { data: text })
      }
      pubSub.publish(Topic.UpdateText, { data: text })
      return { data: text }
    } else {
      return {
        error: { code: 405, message: 'Vous participez déjà à ce texte' }
      }
    }
  }

  async unFollowText(data: any, io?: Server): Promise<IResponse<Text>> {
    const { user, id } = data

    const position = user.followedTexts.indexOf(id)
    if (position >= 0) {
      user.followedTexts.splice(position, 1)
      await user.save()

      const text = await Text.findOne(id)
      text.followersCount--
      await text.save()

      if (io) {
        io.emit('text/' + text.id, { data: text })
      }
      pubSub.publish(Topic.UpdateText, { data: text })
      return { data: text }
    } else {
      return {
        error: { code: 405, message: "Ce texte n'est pas suivi" }
      }
    }
  }

  async postText(data: any, io?: Server): Promise<IResponse<Text>> {
    const { name, description } = data

    const text = new Text(name, description)
    await text.save()

    const event: Event = await new Event('text', text.id.toString())
    await event.save()

    const texts: Text[] = await Text.find()

    if (io) {
      io.emit('events/new', { data: event })
      io.emit('texts/all', { data: texts.map(texte => texte.id) })
    }
    pubSub.publish(Topic.NewEvent, { data: event })
    pubSub.publish(Topic.NewText, { data: text })
    return { data: text }
  }

  async updateTextWithAmend(text: Text, amend: Amend, io: Server) {
    amend.accepted = true
    const newText = JsDiff.applyPatch(text.actual, amend.patch)

    if (newText) {
      amend.version = text.patches.length
      text.patches.push(amend.patch)
      text.actual = newText
    } else {
      amend.conflicted = true
    }

    await text.save()

    if (io) {
      io.emit('text/' + text.id, { data: text })
    }

    const othersAmends = await Amend.find({
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

        oldEvent = await Event.findOne({
          where: {
            target: { id: otherAmend.id.toString() }
          }
        })
        event = new Event('result', otherAmend.id.toString())
        await event.save()
      }

      await otherAmend.save()
      await Event.delete({ id: oldEvent.id })

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
