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
const Event = require('./models/event')

const initDatabase = async () => {
  bcrypt.hash('tmp', 10, async (err, hash) => {
    const adminUser = await new User({
      password: hash,
      email: 'admin@zenika.com'
    }).save()

    const globalGroup = await new Group({
      name: 'Global',
      description: 'Groupe officiel global'
    }).save()

    await new Event({
      targetType: 'group',
      target: JSON.stringify(globalGroup)
    }).save()

    const globalGroupRules = await new Text({
      group: globalGroup._id,
      rules: true
    }).save()

    globalGroup.rules = globalGroupRules._id
    await globalGroup.save()

    const officialGroup = await new Group({
      name: 'Francais',
      description: 'Groupe officiel francophone',
      parent: globalGroup._id
    }).save()

    await new Event({
      targetType: 'group',
      target: JSON.stringify({ ...officialGroup._doc, parent: globalGroup })
    }).save()

    const officialGroupRules = await new Text({
      group: officialGroup._id,
      rules: true
    }).save()

    officialGroup.rules = officialGroupRules._id
    await officialGroup.save()

    const privateGroup = await new Group({
      name: 'Zenika',
      description: 'Groupe privé Zenika',
      parent: officialGroup._id,
      whitelist: ['*@zenika.com']
    }).save()

    await new Event({
      targetType: 'group',
      target: JSON.stringify({ ...privateGroup._doc, parent: officialGroup })
    }).save()

    const privateGroupRules = await new Text({
      group: privateGroup._id,
      rules: true
    }).save()

    privateGroup.rules = privateGroupRules._id
    await privateGroup.save()

    globalGroup.subgroups.push(officialGroup._id)
    await globalGroup.save()

    officialGroup.subgroups.push(privateGroup._id)
    await officialGroup.save()

    const globalText = await new Text({
      name: "Roadmap d'Emendare",
      actual: lorem,
      description:
        'Participez à définir les futures fonctionnalités de la plateforme',
      group: globalGroup._id,
      official: true
    }).save()

    await new Event({
      targetType: 'text',
      target: JSON.stringify({ ...globalText._doc, group: globalGroup })
    }).save()

    const privateText = await new Text({
      name: "Description de l'agence de Rennes",
      actual: lorem,
      description: 'Texte utilisé sur le minisite rennes.zenika.com',
      group: privateGroup._id,
      private: true
    }).save()

    await new Event({
      targetType: 'text',
      target: JSON.stringify({ ...privateText._doc, group: privateGroup })
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
