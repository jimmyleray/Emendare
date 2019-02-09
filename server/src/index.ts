// Global configuration
import config from './config'

// Express Html Application
import express from 'express'
const app = express()

// MongoDB connection
import { Database } from './services'
new Database().connect()

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

// SocketIO routes
import * as routes from './routes'
io.on('connection', socket => {
  Object.keys(routes).forEach(key => {
    const route = (routes as any)[key]
    socket.on(route.name, route.callback({ io, socket }))
  })
})

// Server tasks
import * as tasks from './tasks'
tasks.checkAmendVotes(io)

// Start Http Server
http.listen(config.port, () => {
  console.log(`Server start and listening on port ${config.port}`)
})
