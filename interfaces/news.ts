import { IEvent, IResponse } from './index';

export interface INews {
  event: IEvent;
  target: IResponse<any> | undefined;
}
