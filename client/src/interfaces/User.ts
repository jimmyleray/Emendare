export interface IUser {
  __v: number
  _id: string
  activated: boolean
  activationToken: string
  amends: Array<any>
  created: string
  downVotes: Array<any>
  email: string
  followedTexts: Array<any>
  indVotes: Array<any>
  lastEventDate: string
  notification: {
    amendAccepted: boolean
    amendRefused: boolean
    newAmend: boolean
    newText: boolean
  }
  password: string
  token: string
  upVotes: Array<any>
}
