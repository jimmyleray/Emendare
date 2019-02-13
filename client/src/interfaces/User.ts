export interface IUser {
  __v: number
  _id: string
  activated: boolean
  activationToken: string
  amends: any[]
  created: string
  downVotes: any[]
  email: string
  followedTexts: any[]
  indVotes: any[]
  lastEventDate: string
  notification: {
    amendAccepted: boolean
    amendRefused: boolean
    newAmend: boolean
    newText: boolean
  }
  password: string
  token: string
  upVotes: any[]
}
