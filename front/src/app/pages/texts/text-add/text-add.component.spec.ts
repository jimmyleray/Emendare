import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TextAddComponent } from "./text-add.component";

describe("TextAddComponent", () => {
  let component: TextAddComponent;
  let fixture: ComponentFixture<TextAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextAddComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
