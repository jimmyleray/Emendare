import { IEvent, IResponse } from '../interfaces';

export interface INews {
  event: IEvent;
  target: IResponse<any> | undefined;
}
