export interface IUser {
  __v: number
  _id: string
  activated: boolean
  activationToken: string
  amends: string[]
  created: string
  downVotes: string[]
  email: string
  followedTexts: string[]
  indVotes: string[]
  lastEventDate: string
  notification: {
    amendAccepted: boolean
    amendRefused: boolean
    newAmend: boolean
    newText: boolean
  }
  password: string
  token: string
  upVotes: string[]
}
