import { Injectable } from "@angular/core";
import { Group } from "src/app/models";

const mockGroup1 = new Group();
mockGroup1._id = "test1";
mockGroup1.name = "Test group 1";
mockGroup1.texts = ["test1", "test2"];

const mockGroup2 = new Group();
mockGroup2._id = "test2";
mockGroup2.name = "Test group 2";
mockGroup2.texts = ["test3"];

const mockGroups = [mockGroup1, mockGroup2];

@Injectable()
export class GroupService {
  constructor() {}

  public getGroup(group_id: string) {
    return mockGroups.find(group => group._id === group_id);
  }

  public getAllGroups() {
    return mockGroups;
  }
}
