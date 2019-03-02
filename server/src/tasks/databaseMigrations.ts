import { Text, User, Event, Amend } from '../models'
import { IText, IUser, IEvent, IAmend } from '../../../interfaces'

export const databaseMigrations = async () => {
  // Remove old rules properties
  const texts: IText[] = await Text.model.find()
  texts.forEach(async text => {
    if (typeof text.rules !== 'undefined') {
      delete text.rules
      await text.save()
    }
  })

  // Remove void texts like old rules
  await Text.model.deleteMany({ name: '' })

  // Remove old activationToken if already activated user
  const users: IUser[] = await User.model.find()
  users.forEach(async user => {
    if (user.activated && user.activationToken) {
      user.activationToken = null
      await user.save()
    }
  })

  // Events update
  const events: IEvent[] = await Event.model.find()
  events.forEach(async event => {
    if (!event.target) {
      event.target = {
        id: event.targetID,
        type: event.targetType
      }

      delete event.targetID
      delete event.targetType

      await event.save()
    }
  })

  // Amends update
  const amends: IAmend[] = await Amend.model.find()
  amends.forEach(async amend => {
    if (!amend.results) {
      amend.results = {
        upVotesCount: amend.upVotesCount,
        downVotesCount: amend.downVotesCount,
        indVotesCount: amend.indVotesCount,
        totalPotentialVotesCount: amend.totalPotentialVotesCount
      }

      delete amend.upVotesCount
      delete amend.downVotesCount
      delete amend.indVotesCount
      delete amend.totalPotentialVotesCount

      await amend.save()
    }

    if (!amend.rules) {
      amend.rules = {
        delayMin: amend.delayMin,
        delayMax: amend.delayMax
      }

      delete amend.delayMin
      delete amend.delayMax

      await amend.save()
    }
  })
}
