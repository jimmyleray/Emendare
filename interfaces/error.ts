export interface IError {
  code: number
  message: string
}

export const errorMock: IError = {
  code: 405,
  message: 'test'
}
