export interface IText {
  __v: number
  _id: string
  created: Date | string
  name: string
  description: string
  followersCount: number
  actual: string
  patches: string[]
  amends: string[]
  rules: boolean
}

export const textMock: IText = {
  __v: 0,
  _id: '5c64389cae3ae3695c711e44',
  created: '2019-02-13T15:32:44.344Z',
  name: 'test',
  description: 'test',
  followersCount: 0,
  actual: 'test',
  patches: [],
  amends: [],
  rules: false
}
