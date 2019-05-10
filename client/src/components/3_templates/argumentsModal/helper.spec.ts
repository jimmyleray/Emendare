import {
  getIndexMostFamousDownArgument,
  getIndexMostFamousUpArgument,
  getListArgumentsWithPopularSorting,
  sortArgumentsByUpVote
} from './helpers'
import { IArgument } from '../../../../../interfaces'

const argument: IArgument = {
  type: 'up',
  text: 'test',
  _id: '08oijoij090',
  created: new Date(Date.now()),
  upVotesCount: 0
}

describe('sortArgumentsByUpVote', () => {
  const listArguments = [
    { ...argument, type: 'down', upVotesCount: 0 },
    { ...argument, type: 'down', upVotesCount: 2 },
    { ...argument, type: 'down', upVotesCount: 1 },
    { ...argument, type: 'down', upVotesCount: 3 }
  ]
  it('should render a list sorted by upVotesCount', () => {
    expect(sortArgumentsByUpVote(listArguments)).toEqual([
      { ...argument, type: 'down', upVotesCount: 3 },
      { ...argument, type: 'down', upVotesCount: 2 },
      { ...argument, type: 'down', upVotesCount: 1 },
      { ...argument, type: 'down', upVotesCount: 0 }
    ])
  })
})

describe('getIndexMostFamousDownArgument', () => {
  const listArguments = [
    { ...argument, type: 'up', upVotesCount: 3 },
    { ...argument, type: 'up', upVotesCount: 2 },
    { ...argument, type: 'down', upVotesCount: 1 },
    { ...argument, type: 'down', upVotesCount: 0 }
  ]
  it('should return index 2', () => {
    expect(getIndexMostFamousDownArgument(listArguments)).toBe(2)
  })
})

describe('getIndexMostFamousUpArgument', () => {
  const listArguments = [
    { ...argument, type: 'down', upVotesCount: 3 },
    { ...argument, type: 'up', upVotesCount: 2 },
    { ...argument, type: 'down', upVotesCount: 1 },
    { ...argument, type: 'down', upVotesCount: 0 }
  ]
  it('should return index 1', () => {
    expect(getIndexMostFamousUpArgument(listArguments)).toBe(1)
  })
})

describe('getListArgumentsWithPopularSorting', () => {
  let listArguments = [
    { ...argument, type: 'down', upVotesCount: 3 },
    { ...argument, type: 'down', upVotesCount: 2 },
    { ...argument, type: 'up', upVotesCount: 1 },
    { ...argument, type: 'down', upVotesCount: 0 }
  ]
  it('should return the right list', () => {
    expect(getListArgumentsWithPopularSorting(listArguments)).toEqual([
      { ...argument, type: 'up', upVotesCount: 1 },
      { ...argument, type: 'down', upVotesCount: 3 },
      { ...argument, type: 'down', upVotesCount: 2 },
      { ...argument, type: 'down', upVotesCount: 0 }
    ])
  })
  it('should sort the list with no up argument', () => {
    listArguments = [
      { ...argument, type: 'down', upVotesCount: 3 },
      { ...argument, type: 'down', upVotesCount: 2 },
      { ...argument, type: 'down', upVotesCount: 1 },
      { ...argument, type: 'down', upVotesCount: 0 }
    ]
    expect(getListArgumentsWithPopularSorting(listArguments)).toEqual([
      { ...argument, type: 'down', upVotesCount: 3 },
      { ...argument, type: 'down', upVotesCount: 2 },
      { ...argument, type: 'down', upVotesCount: 1 },
      { ...argument, type: 'down', upVotesCount: 0 }
    ])
  })
  it('should sort the list with up argument which has no upVotesCount', () => {
    listArguments = [
      { ...argument, type: 'down', upVotesCount: 3 },
      { ...argument, type: 'down', upVotesCount: 2 },
      { ...argument, type: 'down', upVotesCount: 1 },
      { ...argument, type: 'up', upVotesCount: 0 }
    ]
    expect(getListArgumentsWithPopularSorting(listArguments)).toEqual([
      { ...argument, type: 'down', upVotesCount: 3 },
      { ...argument, type: 'down', upVotesCount: 2 },
      { ...argument, type: 'down', upVotesCount: 1 },
      { ...argument, type: 'up', upVotesCount: 0 }
    ])
  })
  it('should sort the list with 0 vote count for all the arguments', () => {
    listArguments = [
      { ...argument, type: 'down', upVotesCount: 0 },
      { ...argument, type: 'down', upVotesCount: 0 },
      { ...argument, type: 'down', upVotesCount: 0 },
      { ...argument, type: 'up', upVotesCount: 0 }
    ]
    expect(getListArgumentsWithPopularSorting(listArguments)).toEqual([
      { ...argument, type: 'down', upVotesCount: 0 },
      { ...argument, type: 'down', upVotesCount: 0 },
      { ...argument, type: 'down', upVotesCount: 0 },
      { ...argument, type: 'up', upVotesCount: 0 }
    ])
  })
  it('should sort the list with negative', () => {
    listArguments = [
      { ...argument, type: 'down', upVotesCount: 0 },
      { ...argument, type: 'down', upVotesCount: 0 },
      { ...argument, type: 'down', upVotesCount: 0 },
      { ...argument, type: 'up', upVotesCount: -1 }
    ]
    expect(getListArgumentsWithPopularSorting(listArguments)).toEqual([
      { ...argument, type: 'down', upVotesCount: 0 },
      { ...argument, type: 'down', upVotesCount: 0 },
      { ...argument, type: 'down', upVotesCount: 0 },
      { ...argument, type: 'up', upVotesCount: -1 }
    ])
  })
})
