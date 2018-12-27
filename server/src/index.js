// Global configuration
const config = require('./config')

// Express Html Application
const express = require('express')
const app = express()

// Lib to hash passwords
const bcrypt = require('bcrypt')

// Requests Logger Middleware
const morgan = require('morgan')
app.use(morgan('tiny'))

// JSON Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// CORS Definition
const cors = require('cors')
app.use(cors())

// Matcher utility
// https://github.com/jonschlinkert/is-match
const isMatch = require('is-match')
const isMatchZenika = isMatch('*@zenika.com')

// MongoDB connection
const database = require('./mongo')

// MongoDB models
const User = require('./mongo/models/user')
const Group = require('./mongo/models/group')
const Text = require('./mongo/models/text')
const Amend = require('./mongo/models/amend')
const Event = require('./mongo/models/event')

// Utils function to generate unique tokens
const generateToken = require('./utils/token')

// Error 404 Middleware
app.use((req, res) => {
  res.status(404).end()
})

// Add Socket.io to Express server
const http = require('http').Server(app)
const io = require('socket.io')(http)

let usersCount = 0

io.on('connection', socket => {
  console.log(++usersCount + ' utilisateur(s) connecté(s)')
  socket.on('disconnect', () => {
    console.log(--usersCount + ' utilisateur(s) connecté(s)')
  })

  socket.on('login', async ({ token, data }) => {
    const { email, password } = data
    if (email && password) {
      const user = await User.findOne({ email })
        .populate('amends')
        .populate('followedTexts')
        .populate('followedGroups')
      if (user) {
        bcrypt.compare(password, user.password, async (err, valid) => {
          if (valid) {
            const token = generateToken()
            user.token = token
            await user.save()
            socket.emit('login', { data: user })
          } else {
            socket.emit('login', { error: 'Mot de passe invalide' })
          }
        })
      } else {
        socket.emit('login', { error: 'Email invalide' })
      }
    } else if (token) {
      const user = await User.findOne({ token })
        .populate('amends')
        .populate('followedTexts')
        .populate('followedGroups')
      if (user) {
        socket.emit('login', { data: user })
      } else {
        socket.emit('login', { error: 'Token invalide' })
      }
    } else {
      socket.emit('login', { error: 'Requete invalide' })
    }
  })

  socket.on('signup', async ({ data }) => {
    const { email, password } = data
    if (!email || !isMatchZenika(email)) {
      socket.emit('signup', { error: "Cet email n'est pas encore autorisé" })
    } else {
      if (await User.findOne({ email })) {
        socket.emit('signup', { error: 'Cet email est déjà utilisé' })
      } else {
        if (!password) {
          socket.emit('signup', { error: 'Le mot de passe est requis' })
        } else {
          bcrypt.hash(password, 10, async (err, hash) => {
            await new User({ email, password: hash }).save()
            socket.emit('signup')
          })
        }
      }
    }
  })

  socket.on('logout', async ({ token }) => {
    const user = await User.findOne({ token })
    if (user) {
      user.token = null
      await user.save()
      socket.emit('logout')
    } else {
      socket.emit('logout', { error: 'Cet utilisateur est déjà déconnecté' })
    }
  })

  socket.on('user', async ({ token }) => {
    if (token) {
      const user = await User.findOne({ token })
        .populate('amends')
        .populate('followedTexts')
        .populate('followedGroups')
      socket.emit(
        'user',
        user ? { data: user } : { error: "Cet utilisateur n'est pas connecté" }
      )
    } else {
      socket.emit('user', { error: 'Token invalide' })
    }
  })

  socket.on('rootGroup', async () => {
    const rootGroup = await Group.findOne({ parent: null })
      .populate('subgroups')
      .populate('texts')
      .populate('parent')
      .populate('rules')

    if (rootGroup) {
      socket.emit('rootGroup', { data: rootGroup })
    } else {
      socket.emit('rootGroup', { error: "Ce groupe n'existe pas" })
    }
  })

  socket.on('group', async ({ data }) => {
    const group = await Group.findById(data.id)
      .populate('subgroups')
      .populate('texts')
      .populate('parent')
      .populate('rules')

    if (group) {
      socket.emit('group', { data: group })
    } else {
      socket.emit('group', { error: "Ce groupe n'existe pas" })
    }
  })

  socket.on('text', async ({ data }) => {
    const text = await Text.findById(data.id)
      .populate('amends')
      .populate('group')

    if (text) {
      socket.emit('text', { data: text })
    } else {
      socket.emit('text', { error: "Ce texte n'existe pas" })
    }
  })

  socket.on('amend', async ({ data }) => {
    const amend = await Amend.findById(data.id).populate('text')

    if (amend) {
      socket.emit('amend', { data: amend })
    } else {
      socket.emit('amend', { error: "Cet amendement n'existe pas" })
    }
  })

  socket.on('postAmend', async ({ token, data }) => {
    const { name, description, patch, version, textID } = data
    const user = await User.findOne({ token })
    if (user) {
      const amend = await new Amend({
        name,
        description,
        patch,
        version,
        text: textID
      }).save()

      user.amends.push(amend._id)
      await user.save()

      const text = await Text.findById(textID)
      text.amends.push(amend._id)
      await text.save()

      socket.emit('postAmend')
    } else {
      socket.emit('postAmend', { error: "Cet utilisateur n'est pas connecté" })
    }
  })

  socket.on('followGroup', async ({ token, data }) => {
    const user = await User.findOne({ token })
    if (user) {
      user.followedGroups.push(data.id)
      await user.save()
      socket.emit('followGroup')
    } else {
      socket.emit('followGroup', {
        error: "Cet utilisateur n'est pas connecté"
      })
    }
  })

  socket.on('unFollowGroup', async ({ token, data }) => {
    const user = await User.findOne({ token })
    if (user) {
      const id = user.followedGroups.indexOf(data.id)
      if (id >= 0) {
        user.followedGroups.splice(id, 1)
        await user.save()
        socket.emit('unFollowGroup')
      } else {
        socket.emit('unFollowGroup', { error: "Ce groupe n'est pas suivi" })
      }
    } else {
      socket.emit('unFollowGroup', {
        error: "Cet utilisateur n'est pas connecté"
      })
    }
  })

  socket.on('followText', async ({ token, data }) => {
    const user = await User.findOne({ token })
    if (user) {
      user.followedTexts.push(data.id)
      await user.save()
      socket.emit('followText')
    } else {
      socket.emit('followText', {
        error: "Cet utilisateur n'est pas connecté"
      })
    }
  })

  socket.on('unFollowText', async ({ token, data }) => {
    const user = await User.findOne({ token })
    if (user) {
      const id = user.followedTexts.indexOf(data.id)
      if (id >= 0) {
        user.followedTexts.splice(id, 1)
        await user.save()
        socket.emit('unFollowText')
      } else {
        socket.emit('unFollowText', { error: "Ce texte n'est pas suivi" })
      }
    } else {
      socket.emit('unFollowText', {
        error: "Cet utilisateur n'est pas connecté"
      })
    }
  })
})

// Start Http Server
http.listen(config.port, () => {
  console.log(`Server start and listening on port ${config.port}`)
})
