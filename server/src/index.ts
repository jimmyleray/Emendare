// Global configuration
import config from './config'

// Express Html Application
import express from 'express'
const app = express()

// Matcher utility
// import isMatch from 'is-match'

// MongoDB connection
import Database from './mongo'
new Database().connect()

// Public API
import * as routes from './routes'
Object.keys(routes).forEach(key => {
  const route = (routes as any)[key]
  app.get(route.path, route.callback)
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

// SocketIO ressources
import * as ressources from './ressources'
io.on('connection', socket => {
  const session: any = {}

  Object.keys(ressources).forEach(key => {
    const ressource = (ressources as any)[key]
    socket.on(ressource.name, ressource.callback({ io, socket, session }))
  })
})

// Specific server tasks
import * as tasks from './tasks'
tasks.checkAmendVotes(io)

// Start Http Server
http.listen(config.port, () => {
  console.log(`Server start and listening on port ${config.port}`)
})
