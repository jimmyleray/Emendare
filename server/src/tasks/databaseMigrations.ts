import { Text, User } from '../models'
import { IText, IUser } from '../../../interfaces'

export const databaseMigrations = async () => {
  // Remove old rules properties
  const texts: IText[] = await Text.model.find()
  texts.forEach(async text => {
    if (typeof text.rules !== 'undefined') {
      delete text.rules
      await text.save()
    }
  })

  // Remove void text like old rules
  await Text.model.remove({ name: '' })

  // Remove old activationToken if already activated user
  const users: IUser[] = await User.model.find()
  users.forEach(async user => {
    if (user.activated && user.activationToken) {
      user.activationToken = null
      await user.save()
    }
  })
}
