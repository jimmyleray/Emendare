export interface IAmend {
  __v: number
  _id: string
  created: Date | string
  finised: Date | string
  name: string
  description: string
  patch: string | null
  version: number
  text: string
  arguments: string[]
  upVotesCount: number
  downVotesCount: number
  indVotesCount: number
  totalPotentialVotesCount: number | undefined
  delayMin: number
  closed: boolean
  accepted: boolean
  conflicted: boolean
}

export const amendMock: IAmend = {
  __v: 0,
  _id: '5c64389cae3ae3695c711e44',
  created: '2019-02-13T15:32:44.344Z',
  finised: '2019-02-13T15:42:44.344Z',
  name: 'test',
  description: 'test',
  patch: '',
  version: 0,
  text: '5c64389cae3ae3695c711e44',
  arguments: [],
  upVotesCount: 0,
  downVotesCount: 0,
  indVotesCount: 0,
  totalPotentialVotesCount: 0,
  delayMin: 0,
  closed: true,
  accepted: false,
  conflicted: false
}
