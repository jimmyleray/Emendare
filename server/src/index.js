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

// Users routes
app.post('/signup', async (req, res) => {
  const { email, password } = req.body
  if (!isMatchZenika(email)) {
    res.status(400).end("Cet email n'est pas encore autorisé")
  } else {
    if (await User.findOne({ email })) {
      res.status(400).end('Cet email est déjà utilisé')
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        await new User({ email, password: hash }).save()
        res.end('Nouvel utilisateur enregistré')
      })
    }
  }
})

// Utils function to generate unique tokens
const generateToken = require('./utils/token')

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const token = req.headers['user-token']
  if (email && password) {
    const user = await User.findOne({ email }).populate('amends')
    if (user) {
      bcrypt.compare(password, user.password, async (err, valid) => {
        if (valid) {
          const token = generateToken()
          user.token = token
          await user.save()
          res.json(user)
        } else {
          res.status(400).end('Mot de passe invalide')
        }
      })
    } else {
      res.status(400).end('Email invalide')
    }
  } else if (token) {
    const user = await User.findOne({ token }).populate('amends')
    if (user) {
      res.json(user)
    } else {
      res.status(400).end('Token invalide')
    }
  } else {
    res.status(400).end('Requete invalide')
  }
})

app.post('/logout', async (req, res) => {
  const user = await User.findOne({ token: req.headers['user-token'] })
  if (user) {
    user.token = null
    await user.save()
    res.end('Utilisateur déconnecté')
  } else {
    res.status(400).end('Cet utilisateur est déjà déconnecté')
  }
})

// User routes
app.post('/user', async (req, res) => {
  const user = await User.findOne({
    token: req.headers['user-token']
  }).populate('amends')
  if (user) {
    res.json(user).end()
  } else {
    res.status(400).end("Cet utilisateur n'est pas connecté")
  }
})

app.post('/user/followGroup/:id', async (req, res) => {
  const user = await User.findOne({ token: req.headers['user-token'] })
  if (user) {
    user.followedGroups.push(req.params.id)
    await user.save()
    res.end('Groupe suivi')
  } else {
    res.status(400).end("Cet utilisateur n'est pas connecté")
  }
})

app.post('/user/unFollowGroup/:id', async (req, res) => {
  const user = await User.findOne({ token: req.headers['user-token'] })
  if (user) {
    const id = user.followedGroups.indexOf(req.params.id)
    if (id >= 0) {
      user.followedGroups.splice(id, 1)
      await user.save()
      res.end('Groupe non suivi')
    } else {
      res.status(400).end("Ce groupe n'est pas suivi")
    }
  } else {
    res.status(400).end("Cet utilisateur n'est pas connecté")
  }
})

app.post('/user/followText/:id', async (req, res) => {
  const user = await User.findOne({ token: req.headers['user-token'] })
  if (user) {
    user.followedTexts.push(req.params.id)
    await user.save()
    res.end('Texte suivi')
  } else {
    res.status(400).end("Cet utilisateur n'est pas connecté")
  }
})

app.post('/user/unFollowText/:id', async (req, res) => {
  const user = await User.findOne({ token: req.headers['user-token'] })
  if (user) {
    const id = user.followedTexts.indexOf(req.params.id)
    if (id >= 0) {
      user.followedTexts.splice(id, 1)
      await user.save()
      res.end('Texte non suivi')
    } else {
      res.status(400).end("Ce texte n'est pas suivi")
    }
  } else {
    res.status(400).end("Cet utilisateur n'est pas connecté")
  }
})

// Groups routes
app.get('/rootGroup', async (req, res) => {
  res
    .json(
      await Group.findOne({ parent: null })
        .populate('subgroups')
        .populate('texts')
        .populate('parent')
        .populate('rules')
    )
    .end()
})

app.get('/group/:id', async (req, res) => {
  res
    .json(
      await Group.findById(req.params.id)
        .populate('subgroups')
        .populate('texts')
        .populate('parent')
        .populate('rules')
    )
    .end()
})

// Texts routes
app.get('/text/:id', async (req, res) => {
  res
    .json(
      await Text.findById(req.params.id)
        .populate('amends')
        .populate('group')
    )
    .end()
})

app.get('/amend/:id', async (req, res) => {
  res.json(await Amend.findById(req.params.id).populate('text')).end()
})

app.post('/amend', async (req, res) => {
  const { name, description, patch, version, textID } = req.body
  const user = await User.findOne({ token: req.headers['user-token'] })
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

    res.end('Nouvel amendement enregistré')
  } else {
    res.status(400).end("Cet utilisateur n'est pas connecté")
  }
})

// Error 404 Middleware
app.use((req, res) => {
  res.status(404).end()
})

// Start Http Server
app.listen(config.port, () => {
  console.log(`Server start and listening on port ${config.port}`)
})
