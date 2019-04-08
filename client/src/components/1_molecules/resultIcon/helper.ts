/**
 * Check if the current vote type is the hightest of all the votes type
 * @param vote result of a type of vote
 * @param results results of all votes
 */
export const isMaxVote = (vote: string, results: any, conflicted: boolean) => {
  if (conflicted) {
    return false
  }
  const votes: number[] = Object.keys(results)
    .map((key: string) => results[key])
    .sort()
  return votes.indexOf(results[vote]) === votes.length - 2
}
