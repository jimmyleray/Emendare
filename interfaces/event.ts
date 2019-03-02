export interface IEvent {
  __v: number;
  _id: string;
  created: Date | string;
  targetType?: string;
  targetID?: string;
  target: {
    type: string;
    id: string;
  };
  save?: any;
}

export const eventMock: IEvent = {
  __v: 0,
  _id: "5c64389cae3ae3695c711e44",
  created: "2019-02-13T15:32:44.344Z",
  target: {
    id: "5c64389cae3ae3695c711e44",
    type: "amend"
  }
};
