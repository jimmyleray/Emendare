import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GroupTextsComponent } from "./group-texts.component";

describe("GroupTextsComponent", () => {
  let component: GroupTextsComponent;
  let fixture: ComponentFixture<GroupTextsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupTextsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTextsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
