import { Text } from './text'

test('Text has some utils methods', () => {
  const user = { upVotes: ['test1'], downVotes: [], indVotes: ['test2'] }

  const amend1 = { _id: 'test1', closed: false }
  const amend2 = { _id: 'test2', closed: false }
  const amend3 = { _id: 'test3', closed: true }

  const amends = [amend1, amend2, amend3]

  expect(Text.hasOpenAmend(amends)).toBe(true)
  expect(Text.hasOpenAmendUnvoted(user)(amends)).toBe(false)
})
