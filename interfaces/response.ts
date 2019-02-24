import { IError } from '../interfaces'

export interface IResponse<T> {
  data?: T
  error?: IError
}
