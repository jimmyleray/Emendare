export class UserNotFollowingTextError extends Error {
  message: string = 'Cet utilisateur ne participe pas au texte'
  code: number = 405
}
