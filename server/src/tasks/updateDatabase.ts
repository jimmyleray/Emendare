import { Group, Text, User } from '../models'

export const updateDatabase = async () => {
  // On supprime tous les anciens groupes
  await Group.model.deleteMany({})

  // On supprime les références aux
  // groupes dans les users et texts
  const users = await User.model.find()
  users.forEach(async (user: any) => {
    if (user.followedGroups) {
      delete user.followedGroups
    }
    if (user.notifications && user.notifications.newGroup) {
      delete user.notifications.newGroup
    }
    await user.save()
  })

  const texts = await Text.model.find()
  texts.forEach(async (text: any) => {
    if (text.group) {
      delete text.group
    }
    await text.save()
  })

  console.log('Base de données mise à jour')
}
