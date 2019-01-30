import config from '../config'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// MongoDB models
import { Event, Group, Text, User } from '../models'

export default class Database {
  public connection: mongoose.Connection

  public async connect() {
    this.connection = (await mongoose.connect(
      config.mongoHost,
      { useNewUrlParser: true }
    )).connection

    this.initData()

    return this.connection
  }

  private async initData() {
    if (process.env.NODE_ENV === 'production') {
      await this.connection.dropDatabase()
      this.initProdData()
    } else {
      await this.connection.dropDatabase()
      this.initDevData()
    }
  }

  private async initDevData() {
    bcrypt.hash('admin', 10, async (err, hash) => {
      await new User.model({
        password: hash,
        email: 'jimmy.leray@zenika.com'
      }).save()

      const globalGroup = await new Group.model({
        name: 'Global',
        description: 'Groupe officiel global'
      }).save()

      await new Event.model({
        targetType: 'group',
        targetID: globalGroup._id
      }).save()

      const globalGroupRules = await new Text.model({
        group: globalGroup._id,
        rules: true
      }).save()

      globalGroup.rules = globalGroupRules._id
      await globalGroup.save()

      const globalText = await new Text.model({
        name: "Roadmap d'Emendare",
        description: 'Participez à définir les futures fonctionnalités',
        group: globalGroup._id
      }).save()

      await new Event.model({
        targetType: 'text',
        targetID: globalText._id
      }).save()

      globalGroup.texts.push(globalText._id)
      await globalGroup.save()
    })
  }

  private async initProdData() {
    const globalGroup = await new Group.model({
      name: 'Emendare',
      description: 'Groupe officiel du projet'
    }).save()

    await new Event.model({
      targetType: 'group',
      targetID: globalGroup._id
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
      targetID: roadmapText._id
    }).save()

    globalGroup.texts.push(roadmapText._id)
    await globalGroup.save()

    const sandboxText = await new Text.model({
      name: 'Soirée FDLN',
      description: 'Une synthèse de la soirée pour le Grand Débat National',
      group: globalGroup._id
    }).save()

    await new Event.model({
      targetType: 'text',
      targetID: sandboxText._id
    }).save()

    globalGroup.texts.push(sandboxText._id)
    await globalGroup.save()
  }
}
