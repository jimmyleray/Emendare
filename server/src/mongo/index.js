const config = require('../config')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const lorem = require('../utils/lorem')

mongoose.connect(
  config.mongoHost,
  { useNewUrlParser: true }
)

const database = mongoose.connection

database.once('open', () => {
  console.log('Connected to MongoDB on', config.mongoHost)
})

database.on('error', error => {
  console.error('MongoDB Error', error)
})

// MongoDB models
const User = require('./models/user')
const Group = require('./models/group')
const Text = require('./models/text')

const initDatabase = async () => {
  bcrypt.hash('tmp', 10, async (err, hash) => {
    const adminUser = await new User({
      password: hash,
      email: 'admin@zenika.com'
    }).save()

    const globalGroup = await new Group({
      owners: [adminUser._id],
      name: 'Global',
      description: 'Groupe officiel global',
      official: true
    }).save()

    const officialGroup = await new Group({
      owners: [adminUser._id],
      name: 'Francais',
      description: 'Groupe officiel francophone',
      parent: globalGroup._id,
      official: true
    }).save()

    const privateGroup = await new Group({
      owners: [adminUser._id],
      name: 'Zenika',
      description: 'Groupe privé Zenika',
      parent: officialGroup._id,
      private: true,
      whitelist: ['*@zenika.com']
    }).save()

    globalGroup.subgroups.push(officialGroup._id)
    await globalGroup.save()

    officialGroup.subgroups.push(privateGroup._id)
    await officialGroup.save()

    const globalText = await new Text({
      owners: [adminUser._id],
      name: "Roadmap d'Emendare",
      actual: lorem,
      description:
        'Participez à définir les futures fonctionnalités de la plateforme',
      group: globalGroup._id,
      official: true
    }).save()

    const privateText = await new Text({
      owners: [adminUser._id],
      name: "Description de l'agence de Rennes",
      actual: lorem,
      description: 'Texte utilisé sur le minisite rennes.zenika.com',
      group: privateGroup._id,
      private: true
    }).save()

    globalGroup.texts.push(globalText._id)
    await globalGroup.save()

    privateGroup.texts.push(privateText._id)
    await privateGroup.save()
  })
}

if (process.env.NODE_ENV !== 'production') {
  database.dropDatabase()
  initDatabase()
}

module.exports = database
