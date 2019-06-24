export class UserAlreadyVoteDownError extends Error {
  message: string = 'Vous avez déjà voté contre'
  code: number = 405
}
