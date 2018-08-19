import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AmendComponent } from "./amend.component";

describe("AmendComponent", () => {
  let component: AmendComponent;
  let fixture: ComponentFixture<AmendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AmendComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
