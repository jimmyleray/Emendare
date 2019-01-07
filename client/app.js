// Init Express Application
const express = require('express')
const app = express()

// For redirect http to https
const enforce = require('express-sslify')
app.use(enforce.HTTPS({ trustProtoHeader: true }))

// For Cors headers
const cors = require('cors')
app.use(cors())

// For Gzip compression
const compression = require('compression')
app.use(compression())

// For static files
app.use(express.static(__dirname + '/build'))

// Launch server
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Emendare client running on port ${port}`))
