import { isMaxVote } from './helper'

describe('isMaxVote', () => {
  const mockResult = {
    upVotesCount: 1,
    downVotesCount: 1,
    indVotesCount: 1,
    totalPotentialVotesCount: 3
  }
  it('should return true', () => {
    expect(
      isMaxVote(
        'upVotesCount',
        {
          ...mockResult,
          upVotesCount: 2,
          totalPotentialVotesCount: 4
        },
        false
      )
    ).toBeTruthy()
  })
  it('should return false', () => {
    expect(
      isMaxVote(
        'upVotesCount',
        {
          ...mockResult,
          upVotesCount: 0,
          totalPotentialVotesCount: 3
        },
        false
      )
    ).toBeFalsy()

    expect(
      isMaxVote(
        'upVotesCount',
        {
          ...mockResult,
          upVotesCount: 0,
          totalPotentialVotesCount: 3
        },
        true
      )
    ).toBeFalsy()
  })
})
