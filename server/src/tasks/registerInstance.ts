import { Text, User } from '../models'
import { IText, IUser } from '../../../interfaces'
import fetch from 'node-fetch'
import config from '../config'

export const registerInstance = async () => {
  const texts: IText[] = await Text.model.find()
  const users: IUser[] = await User.model.find()

  const res = await fetch(config.registerUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: config.instance.name,
      description: config.instance.description,
      language: config.instance.language,
      users: users.filter(user => user.activated).length,
      texts: texts.length
    })
  })

  const data = await res.json()
  console.log(data)
}
