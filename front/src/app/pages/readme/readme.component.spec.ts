import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReadmeComponent } from "./readme.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("ReadmeComponent", () => {
  let component: ReadmeComponent;
  let fixture: ComponentFixture<ReadmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadmeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
