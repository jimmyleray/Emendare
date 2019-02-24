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
  notifications: {
    amendAccepted: boolean
    amendRefused: boolean
    newAmend: boolean
    newText: boolean
  }
  password: string
  token: string
  upVotes: string[]
  save?: any
}

export const userMock: IUser = {
  __v: 0,
  _id: '5c64389cae3ae3695c711e44',
  activated: true,
  activationToken: '4d55a560ea0be764c55dc01a872c8fc8205cf262994c8',
  amends: [],
  created: '2019-02-13T15:32:44.344Z',
  downVotes: [],
  email: 'test@test.com',
  followedTexts: [],
  indVotes: [],
  lastEventDate: '2019-02-13T15:32:44.344Z',
  notifications: {
    amendAccepted: true,
    amendRefused: true,
    newAmend: true,
    newText: true
  },
  password: '$2b$10$l94oFgHbt8wv4woE7JfdmOPOrZuLMSMrc6tVBDP3m0mg5U/uCi5VC',
  token: 'bfb82457793d31a7',
  upVotes: []
}
