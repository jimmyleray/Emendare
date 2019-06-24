export class TextDoesntExistError extends Error {
  message: string = "Oups, ce texte n'existe pas"
  code: number = 404
}
