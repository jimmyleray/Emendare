export class UserDoesntVoteError extends Error {
  message: string = "Vous n'avez pas encore voté pour cet argument"
  code: number = 405
}
