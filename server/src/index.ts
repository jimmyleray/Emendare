// Global configuration
import config from './config'

// Express Html Application
import express from 'express'
const app = express()

// Matcher utility
// https://github.com/jonschlinkert/is-match
// import isMatch from 'is-match'
// const isMatchZenika = isMatch('*@zenika.com')

import { delay } from 'lodash'

// Diff Patch Library
import * as JsDiff from 'diff'

// MongoDB connection
import Database from './mongo'
new Database().connect()

// MongoDB models
import { Amend, Event, Text } from './models'

// Public API for get texts by ID
app.get('/text/:id', async (req, res) => {
  const text = await Text.model.findById(req.params.id)
  if (text) {
    res.end(text.actual)
  } else {
    res.status(404).end()
  }
})

// Error 404 Middleware
app.use((req, res) => {
  res.status(404).end()
})

// Add Socket.io to Express server
import { Server } from 'http'
const http = new Server(app)

import socketIO from 'socket.io'
const io = socketIO(http, {
  cookie: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  serveClient: false
})

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

const updateTextWithAmend = async (amend: any) => {
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

const checkAmendVotes = async () => {
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
        updateTextWithAmend(amend)
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
        updateTextWithAmend(amend)
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

  delay(checkAmendVotes, 5000)
}

checkAmendVotes()

import * as ressources from './ressources'

io.on('connection', socket => {
  const session: any = {}

  Object.keys(ressources)
    .map(key => (ressources as any)[key])
    .forEach((ressource: any) => {
      socket.on(ressource.name, ressource.callback({ io, socket, session }))
    })
})

// Start Http Server
http.listen(config.port, () => {
  console.log(`Server start and listening on port ${config.port}`)
})
