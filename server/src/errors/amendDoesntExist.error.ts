export class AmendDoesntExistError extends Error {
  message: string = "Cet amendement n'existe pas"
  code: number = 404
}
