import { Amend } from './amend'

test('Amend is voted by a user method', () => {
  const user = { upVotes: ['test1'], downVotes: [], indVotes: ['test3'] }

  const amend1 = { _id: 'test1' }
  const amend2 = { _id: 'test2' }
  const amend3 = { _id: 'test3' }

  expect(Amend.isVoted(user)(amend1)).toBe(true)
  expect(Amend.isVoted(user)(amend2)).toBe(false)
  expect(Amend.isVoted(user)(amend3)).toBe(true)
})
