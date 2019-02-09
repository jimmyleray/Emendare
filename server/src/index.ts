// Chalk for colored logs
import chalk from 'chalk'

// Initial server log
console.log(chalk.green('> Emendare Server launch\n'))

// Global configuration
import config from './config'

// Express Html Application
import express from 'express'
const app = express()

// Server basics imports
import { Server } from 'http'
import socketIO from 'socket.io'
import * as routes from './routes'
import * as tasks from './tasks'

// MongoDB connection
import { Database } from './services'
new Database()
  .connect()
  .then(() => {
    // Add Socket.io to Express server
    const http = new Server(app)
    const io = socketIO(http, {
      cookie: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      serveClient: false
    })

    // SocketIO routes
    io.on('connection', socket => {
      Object.keys(routes).forEach(key => {
        const route = (routes as any)[key]
        socket.on(route.name, route.callback({ io, socket }))
      })
    })

    // Server tasks
    tasks.checkAmendVotes(io)

    // Start Http Server
    http.listen(config.port, () => {
      console.log(
        chalk.green(`Emendare server listening on port ${config.port}`)
      )
    })
  })
  .catch(error => {
    console.log(chalk.red('Emendare server start failed', error))
  })
