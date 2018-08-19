import { Injectable } from "@angular/core";
import { Text } from "src/app/models";

const mockText1 = new Text();
mockText1._id = "test1";
mockText1.name = "Test text 1";
mockText1.content = "# Test text 1";
mockText1.group_id = "test1";

const mockText2 = new Text();
mockText2._id = "test2";
mockText2.name = "Test text 2";
mockText2.content = "# Test text 2";
mockText2.group_id = "test1";

const mockText3 = new Text();
mockText3._id = "test3";
mockText3.name = "Test text 3";
mockText3.content = "# Test text 3";
mockText3.group_id = "test2";

const mockTexts = [mockText1, mockText2, mockText3];

@Injectable()
export class TextService {
  constructor() {}

  public getText(text_id: string) {
    return mockTexts.find(text => text._id === text_id);
  }

  public getTexts(group_id: string) {
    return mockTexts.filter(text => text.group_id === group_id);
  }

  public getAllTexts() {
    return mockTexts;
  }
}
