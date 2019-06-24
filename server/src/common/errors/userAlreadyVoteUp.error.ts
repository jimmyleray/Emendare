export class UserAlreadyVoteUpError extends Error {
  message: string = 'Vous avez déjà voté pour'
  code: number = 405
}
