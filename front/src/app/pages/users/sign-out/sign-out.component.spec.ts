import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SignOutComponent } from "./sign-out.component";

describe("SignOutComponent", () => {
  let component: SignOutComponent;
  let fixture: ComponentFixture<SignOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignOutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
