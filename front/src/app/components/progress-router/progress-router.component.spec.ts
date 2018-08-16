import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProgressRouterComponent } from "./progress-router.component";

describe("ProgressRouterComponent", () => {
  let component: ProgressRouterComponent;
  let fixture: ComponentFixture<ProgressRouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressRouterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
