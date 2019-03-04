/* eslint-disable no-console */

// Init Express Application
const path = require('path')
const express = require('express')
const app = express()

// For redirect http to https in production
if (process.env.NODE_ENV === 'production') {
  const enforce = require('express-sslify')
  app.use(enforce.HTTPS({ trustProtoHeader: true }))
}

// For Cors headers
const cors = require('cors')
app.use(cors())

// For Gzip compression
const compression = require('compression')
app.use(compression())

// Middleware for caching
const serveStatic = require('serve-static')
const oneWeek = 604800000
const maxAge = process.env.NODE_ENV === 'production' ? oneWeek : 0
const setCustomCacheControl = (res, path) => {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    res.setHeader('Cache-Control', 'build, max-age=0')
  }
}

// For static files
app.use(
  serveStatic(path.join(__dirname + '/build'), {
    maxAge,
    setHeaders: setCustomCacheControl
  })
)

// For all routes, SPA redirection
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html')
})

// Launch server
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Emendare client running on port ${port}`))
