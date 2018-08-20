import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TextsListComponent } from "./texts-list.component";

describe("TextsListComponent", () => {
  let component: TextsListComponent;
  let fixture: ComponentFixture<TextsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextsListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
