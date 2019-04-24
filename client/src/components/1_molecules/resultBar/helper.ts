/**
 * Return the pourcentage of up/down/ind vote
 * @param result Result of the vote
 */
export const getPourcentageVote = (result: {
  up: number
  ind: number
  down: number
}): { up: number; down: number; ind: number } => {
  const { up, down, ind } = result
  const totalVote = up + down + ind
  return {
    up: up === 0 ? 0 : (up / totalVote) * 100,
    down: down === 0 ? 0 : (down / totalVote) * 100,
    ind: ind === 0 ? 0 : (ind / totalVote) * 100
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
  return up === 0 && down === 0 && ind === 0
    ? `linear-gradient(to right, hsl(0, 0%, 71%) 0%, hsl(0, 0%, 71%) 100%)`
    : `linear-gradient(to right,hsl(217, 71%, 53%) ${up}%, hsl(217, 71%, 53%) ${up}%, hsl(204, 86%, 53%) ${up +
        ind}%, hsl(348, 100%, 61%) ${up + ind}%,hsl(348, 100%, 61%) ${up +
        ind +
        down}%  )`
}
