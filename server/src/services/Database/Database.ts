import config from '../../config'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// MongoDB models
import { Event, Text, User } from '../../models'
import chalk from 'chalk'

export class Database {
  public connection: mongoose.Connection

  public async connect() {
    return new Promise(async (resolve, reject) => {
      this.connection = mongoose.connection

      this.connection.on('error', error => {
        console.log(chalk.red('Database connection failed'))
        reject(error)
      })

      this.connection.once('open', () => {
        console.log(chalk.cyan('Database connection succeed'))
        this.initData()
        resolve(this.connection)
      })

      await mongoose.connect(config.mongoHost, {
        useNewUrlParser: true
      })
    })
  }

  private async initData() {
    if (process.env.NODE_ENV !== 'production') {
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

      const globalText = await new Text.model({
        name: "Roadmap d'Emendare",
        description: 'Participez à définir les futures fonctionnalités'
      }).save()

      await new Event.model({
        targetType: 'text',
        targetID: globalText._id
      }).save()
    })
  }
}
