import config from '../../config'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// MongoDB models
import { Event, Text, User } from '../../models'

export class Database {
  public connection: mongoose.Connection

  public async connect() {
    this.connection = (await mongoose.connect(config.mongoHost, {
      useNewUrlParser: true
    })).connection

    this.initData()

    return this.connection
  }

  private async initData() {
    if (process.env.NODE_ENV === 'production') {
      // await this.connection.dropDatabase()
      // this.editProdData()
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

  // private async editProdData() {}
}
