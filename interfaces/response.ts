import { IError, IEvent } from '../interfaces'

export interface IResponse<T> {
  data?: T
  error?: IError
}

export interface IResponseWithEvent<T> extends IResponse<T> {
  event?: any
}
