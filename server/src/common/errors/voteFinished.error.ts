export class VoteFinishedError extends Error {
  message: string = 'Ce scrutin est terminé'
  code: number = 405
}
