import { createLinearGradientFromResult, getPourcentageVote } from './helper'

describe('createLinearGradientFromResult', () => {
  it('should render the right gradient', () => {
    expect(createLinearGradientFromResult({ up: 40, down: 30, ind: 30 })).toBe(
      `linear-gradient(to right,hsl(141, 71%, 48%) ${40}%, hsl(204, 86%, 53%) ${40}%, hsl(204, 86%, 53%) ${40 +
        30}%, hsl(348, 100%, 61%) ${40 + 30}%,hsl(348, 100%, 61%) ${40 +
        30 +
        30}%  )`
    )
  })
})

describe('getPourcentageVote', () => {
  it('should render the right pourcentage', () => {
    expect(getPourcentageVote({ up: 2, down: 1, ind: 1 })).toMatchObject({
      up: 50,
      down: 25,
      ind: 25
    })
  })
})
