import { IResult } from '../../../../../interfaces'

/**
 * Return the pourcentage of up/down/ind vote
 * @param result Result of the vote
 */
export const getPourcentageVote = (result: {
  up: number
  ind: number
  down: number
}) => {
  const { up, down, ind } = result
  const totalVote = up + down + ind
  return {
    up: (up / totalVote) * 100,
    down: (down / totalVote) * 100,
    ind: (ind / totalVote) * 100
  }
}

/**
 * Return a css gradient to display the result in a progress bar
 * @param pourcentageVote Result in pourcentage
 */
export const createLinearGradientFromResult = (pourcentageVote: {
  up: number
  ind: number
  down: number
}) => {
  const { up, down, ind } = pourcentageVote
  return `linear-gradient(to right,hsl(141, 71%, 48%) ${up}%, hsl(204, 86%, 53%) ${up}%, hsl(204, 86%, 53%) ${up +
    ind}%, hsl(348, 100%, 61%) ${up + ind}%,hsl(348, 100%, 61%) ${up +
    ind +
    down}%  )`
}
