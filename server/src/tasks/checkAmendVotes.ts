import { delay } from 'lodash'
import socketIO from 'socket.io'

// Diff Patch Library
import * as JsDiff from 'diff'

// MongoDB models
import { Amend, Event, Text } from '../models'

const hasAbsoluteUpMajority = (amend: any) =>
  amend.upVotesCount > amend.indVotesCount &&
  amend.upVotesCount + amend.indVotesCount >=
    Math.floor(amend.text.followersCount / 2) + 1

const hasAbsoluteDownMajority = (amend: any) =>
  amend.downVotesCount > amend.indVotesCount &&
  amend.downVotesCount + amend.indVotesCount >=
    Math.floor(amend.text.followersCount / 2) + 1

const hasAbsoluteMajority = (amend: any) =>
  hasAbsoluteUpMajority(amend) || hasAbsoluteDownMajority(amend)

const hasRelativeUpMajority = (amend: any) =>
  amend.upVotesCount > amend.downVotesCount

const updateTextWithAmend = (io: SocketIO.Server) => async (amend: any) => {
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
  io.emit('text/' + text._id, { data: text })

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
    io.emit('amend/' + otherAmend._id, { data: otherAmend })
  })
}

export const checkAmendVotes = async (io: socketIO.Server) => {
  // On récupère tous les scrutins en cours
  const amends = await Amend.model.find({ closed: false }).populate('text')

  const date = new Date()
  const now = date.getTime()

  amends.forEach(async (amend: any) => {
    const start = amend.created.getTime()

    // Si le scrutin est terminé
    if (now > start + amend.delayMax) {
      amend.closed = true
      amend.finished = new Date()
      amend.totalPotentialVotesCount = amend.text.followersCount

      // Si il y'a une majorité relative
      if (hasRelativeUpMajority(amend)) {
        updateTextWithAmend(io)(amend)
      }

      await amend.save()
      const newAmend = await Amend.model.findById(amend._id)
      io.emit('amend/' + amend._id, { data: newAmend })

      await new Event.model({
        targetType: 'result',
        targetID: newAmend._id
      }).save()

      const events = await Event.model.find().sort('-created')
      io.emit('events/all', { data: events })
    } else if (now > start + amend.delayMin && hasAbsoluteMajority(amend)) {
      amend.closed = true
      amend.finished = new Date()
      amend.totalPotentialVotesCount = amend.text.followersCount

      // Si il y'a une majorité absolue
      if (hasAbsoluteUpMajority(amend)) {
        updateTextWithAmend(io)(amend)
      }

      await amend.save()
      const newAmend = await Amend.model.findById(amend._id)
      io.emit('amend/' + amend._id, { data: newAmend })

      await new Event.model({
        targetType: 'result',
        targetID: newAmend._id
      }).save()

      const events = await Event.model.find().sort('-created')
      io.emit('events/all', { data: events })
    }
  })

  delay(() => {
    checkAmendVotes(io)
  }, 5000)
}
