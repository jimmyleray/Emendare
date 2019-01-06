const config = require('../config')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
const User = require('../models/user')
const Group = require('../models/group')
const Text = require('../models/text')
const Event = require('../models/event')

const initDevDatabase = async () => {
  bcrypt.hash('tmp', 10, async (err, hash) => {
    await new User.model({
      password: hash,
      email: 'admin@zenika.com'
    }).save()

    const globalGroup = await new Group.model({
      name: 'Global',
      description: 'Groupe officiel global'
    }).save()

    await new Event.model({
      targetType: 'group',
      target: JSON.stringify(globalGroup)
    }).save()

    const globalGroupRules = await new Text.model({
      group: globalGroup._id,
      rules: true
    }).save()

    globalGroup.rules = globalGroupRules._id
    await globalGroup.save()

    const officialGroup = await new Group.model({
      name: 'Francais',
      description: 'Groupe officiel francophone',
      parent: globalGroup._id
    }).save()

    await new Event.model({
      targetType: 'group',
      target: JSON.stringify({ ...officialGroup._doc, parent: globalGroup })
    }).save()

    const officialGroupRules = await new Text.model({
      group: officialGroup._id,
      rules: true
    }).save()

    officialGroup.rules = officialGroupRules._id
    await officialGroup.save()

    const privateGroup = await new Group.model({
      name: 'Zenika',
      description: 'Groupe privé Zenika',
      parent: officialGroup._id,
      whitelist: ['*@zenika.com']
    }).save()

    await new Event.model({
      targetType: 'group',
      target: JSON.stringify({ ...privateGroup._doc, parent: officialGroup })
    }).save()

    const privateGroupRules = await new Text.model({
      group: privateGroup._id,
      rules: true
    }).save()

    privateGroup.rules = privateGroupRules._id
    await privateGroup.save()

    globalGroup.subgroups.push(officialGroup._id)
    await globalGroup.save()

    officialGroup.subgroups.push(privateGroup._id)
    await officialGroup.save()

    const globalText = await new Text.model({
      name: "Roadmap d'Emendare",
      description: 'Participez à définir les futures fonctionnalités',
      group: globalGroup._id
    }).save()

    await new Event.model({
      targetType: 'text',
      target: JSON.stringify({ ...globalText._doc, group: globalGroup })
    }).save()

    const privateText = await new Text.model({
      name: "Description de l'agence de Rennes",
      description: 'Texte utilisé sur rennes.zenika.com',
      group: privateGroup._id
    }).save()

    await new Event.model({
      targetType: 'text',
      target: JSON.stringify({ ...privateText._doc, group: privateGroup })
    }).save()

    globalGroup.texts.push(globalText._id)
    await globalGroup.save()

    privateGroup.texts.push(privateText._id)
    await privateGroup.save()
  })
}

const initProdDatabase = async () => {
  const globalGroup = await new Group.model({
    name: 'Global',
    description: 'Groupe officiel global'
  }).save()

  await new Event.model({
    targetType: 'group',
    target: JSON.stringify(globalGroup)
  }).save()

  const globalGroupRules = await new Text.model({
    group: globalGroup._id,
    rules: true
  }).save()

  globalGroup.rules = globalGroupRules._id
  await globalGroup.save()

  const roadmapText = await new Text.model({
    name: "Roadmap d'Emendare",
    description: 'Participez à définir les futures fonctionnalités',
    group: globalGroup._id
  }).save()

  await new Event.model({
    targetType: 'text',
    target: JSON.stringify({ ...roadmapText._doc, group: globalGroup })
  }).save()

  globalGroup.texts.push(roadmapText._id)
  await globalGroup.save()

  const ethicText = await new Text.model({
    name: 'Charte éthique',
    description: 'Participez à définir les valeurs de la plateforme',
    group: globalGroup._id
  }).save()

  await new Event.model({
    targetType: 'text',
    target: JSON.stringify({ ...ethicText._doc, group: globalGroup })
  }).save()

  globalGroup.texts.push(ethicText._id)
  await globalGroup.save()

  const sandboxText = await new Text.model({
    name: 'Sandbox',
    description: "Un espace pour tester ce que vous voulez pendant l'alpha",
    group: globalGroup._id
  }).save()

  await new Event.model({
    targetType: 'text',
    target: JSON.stringify({ ...sandboxText._doc, group: globalGroup })
  }).save()

  globalGroup.texts.push(sandboxText._id)
  await globalGroup.save()

  const privateGroup = await new Group.model({
    name: 'Zenika',
    description: 'Groupe privé Zenika',
    parent: globalGroup._id,
    whitelist: ['*@zenika.com']
  }).save()

  await new Event.model({
    targetType: 'group',
    target: JSON.stringify({ ...privateGroup._doc, parent: globalGroup })
  }).save()

  const privateGroupRules = await new Text.model({
    group: privateGroup._id,
    rules: true
  }).save()

  privateGroup.rules = privateGroupRules._id
  await privateGroup.save()

  globalGroup.subgroups.push(privateGroup._id)
  await globalGroup.save()

  const sandboxZText = await new Text.model({
    name: 'Sandbox Zenika',
    description:
      "Un autre espace pour tester ce que vous voulez pendant l'alpha",
    group: privateGroup._id
  }).save()

  await new Event.model({
    targetType: 'text',
    target: JSON.stringify({ ...sandboxZText._doc, group: privateGroup })
  }).save()

  privateGroup.texts.push(sandboxZText._id)
  await privateGroup.save()

  const ceText = await new Text.model({
    name: "Comité d'entreprise",
    description: 'Texte pour définir les actions du CE de Zenika Rennes',
    group: privateGroup._id
  }).save()

  await new Event.model({
    targetType: 'text',
    target: JSON.stringify({ ...ceText._doc, group: privateGroup })
  }).save()

  privateGroup.texts.push(ceText._id)
  await privateGroup.save()
}

if (process.env.NODE_ENV === 'production') {
  database.dropDatabase()
  initProdDatabase()
} else {
  database.dropDatabase()
  initDevDatabase()
}

module.exports = database
